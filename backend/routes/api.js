import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const FlexibleSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });
const mediaUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]);
const galleryUpload = upload.array('files', 100);

const getModel = (collectionName) =>
  mongoose.models[collectionName] || mongoose.model(collectionName, FlexibleSchema, collectionName);

const toFileUrl = (req, file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

const isUploadReference = (value) => typeof value === 'string' && value.includes('/uploads/');

const deleteUploadedFile = (value) => {
  if (!isUploadReference(value)) return;

  try {
    const pathname = value.startsWith('http') ? new URL(value).pathname : value;
    const filename = path.basename(pathname);
    const filePath = path.join(uploadsDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (_error) {
    // Ignore cleanup failures so API responses stay stable.
  }
};

const trimValue = (value) => (typeof value === 'string' ? value.trim() : value);

const normalizePayload = (collection, body, files, req, currentItem = {}) => {
  const payload = Object.fromEntries(
    Object.entries(body || {}).map(([key, value]) => [key, trimValue(value)])
  );

  const uploadedImage = files?.image?.[0];
  const uploadedVideo = files?.video?.[0];

  if (uploadedImage) {
    payload.image = toFileUrl(req, uploadedImage);
  }

  if (uploadedVideo) {
    payload.video = toFileUrl(req, uploadedVideo);
    payload.type = 'upload';
    payload.videoName = uploadedVideo.originalname;
  }

  if (collection === 'gallery') {
    payload.title = payload.title || '';
    payload.description = '';
    payload.excerpt = '';
    payload.category = '';
    
    // If it's a video upload, ensure type is set correctly
    if (uploadedVideo || payload.video) {
       payload.type = 'video';
    } else {
       payload.type = 'image';
    }
    
    delete payload.videoId;
  }

  if (collection === 'videos') {
    if (payload.videoId) {
      payload.type = 'youtube';
      delete payload.video;
      delete payload.videoName;
    } else if (payload.video || currentItem.video) {
      payload.type = 'upload';
      delete payload.videoId;
    }
  }

  return payload;
};

router.get('/:collection/:id', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Database disconnected. Check IP whitelist on Atlas.' });
  }
  try {
    const Model = getModel(req.params.collection);
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (_error) {
    res.status(500).json({ error: 'Database read error' });
  }
});

router.get('/:collection', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Database disconnected. Check IP whitelist on Atlas.' });
  }
  try {
    const Model = getModel(req.params.collection);
    const data = await Model.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (_error) {
    res.status(500).json({ error: 'Database read error' });
  }
});

router.post('/gallery/bulk-upload', galleryUpload, async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Database disconnected. Check IP whitelist on Atlas.' });
  }
  try {
    const files = req.files || [];

    if (!files.length) {
      return res.status(400).json({ error: 'Please upload at least one file.' });
    }

    const Model = getModel('gallery');
    const items = files.map((file) => {
      const isVideo = file.mimetype.startsWith('video/');
      return {
        title: '',
        description: '',
        type: isVideo ? 'video' : 'image',
        [isVideo ? 'video' : 'image']: toFileUrl(req, file),
      };
    });

    const savedItems = await Model.insertMany(items);
    res.status(201).json(savedItems);
  } catch (_error) {
    (req.files || []).forEach((file) => deleteUploadedFile(`/uploads/${file.filename}`));
    res.status(500).json({ error: 'Bulk gallery upload failed' });
  }
});

router.post('/:collection', mediaUpload, async (req, res) => {
  try {
    const Model = getModel(req.params.collection);
    const payload = normalizePayload(req.params.collection, req.body, req.files, req);
    const newItem = await Model.create(payload);
    res.status(201).json(newItem);
  } catch (_error) {
    deleteUploadedFile(req.files?.image?.[0] ? `/uploads/${req.files.image[0].filename}` : '');
    deleteUploadedFile(req.files?.video?.[0] ? `/uploads/${req.files.video[0].filename}` : '');
    res.status(500).json({ error: 'Database write error' });
  }
});

router.put('/:collection/:id', mediaUpload, async (req, res) => {
  try {
    const Model = getModel(req.params.collection);
    const currentItem = await Model.findById(req.params.id);

    if (!currentItem) {
      deleteUploadedFile(req.files?.image?.[0] ? `/uploads/${req.files.image[0].filename}` : '');
      deleteUploadedFile(req.files?.video?.[0] ? `/uploads/${req.files.video[0].filename}` : '');
      return res.status(404).json({ error: 'Not found' });
    }

    const payload = normalizePayload(req.params.collection, req.body, req.files, req, currentItem);

    if (req.files?.image?.[0] && currentItem.image && currentItem.image !== payload.image) {
      deleteUploadedFile(currentItem.image);
    }

    if (req.files?.video?.[0] && currentItem.video && currentItem.video !== payload.video) {
      deleteUploadedFile(currentItem.video);
    }

    const updatedItem = await Model.findByIdAndUpdate(req.params.id, payload, { new: true });
    res.json(updatedItem);
  } catch (_error) {
    deleteUploadedFile(req.files?.image?.[0] ? `/uploads/${req.files.image[0].filename}` : '');
    deleteUploadedFile(req.files?.video?.[0] ? `/uploads/${req.files.video[0].filename}` : '');
    res.status(500).json({ error: 'Database update error' });
  }
});

router.delete('/:collection/:id', async (req, res) => {
  try {
    const Model = getModel(req.params.collection);
    const deleted = await Model.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Not found' });
    }

    deleteUploadedFile(deleted.image);
    deleteUploadedFile(deleted.video);

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (_error) {
    res.status(500).json({ error: 'Database delete error' });
  }
});

export default router;
