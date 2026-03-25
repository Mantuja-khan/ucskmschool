import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Book,
  FileText,
  Image as ImageIcon,
  Loader2,
  Lock,
  LogOut,
  Pencil,
  Save,
  Trash2,
  Upload,
  User,
  Video,
  X,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getApiUrl, toAbsoluteMediaUrl } from "@/lib/api";

type CollectionKey = "videos" | "blogs" | "books" | "gallery";

type AdminItem = {
  _id: string;
  title?: string;
  description?: string;
  excerpt?: string;
  image?: string;
  category?: string;
  videoId?: string;
  video?: string;
  type?: string;
  videoName?: string;
  createdAt?: string;
};

const INITIAL_FORM = {
  title: "",
  videoId: "",
  description: "",
  excerpt: "",
  image: "",
  category: "",
};

const collectionLabels: Record<CollectionKey, string> = {
  videos: "Videos",
  blogs: "Articles",
  books: "Books",
  gallery: "Gallery",
};

const getYoutubeThumb = (videoId?: string) =>
  videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";

const CircularUploadProgress = ({ progress }: { progress: number }) => {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} stroke="currentColor" strokeWidth="10" className="text-muted/60" fill="none" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          className="text-secondary transition-all duration-300"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold">{progress}%</div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Upload</div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<CollectionKey>("videos");
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });
  const [items, setItems] = useState<AdminItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<AdminItem | null>(null);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryProgress, setGalleryProgress] = useState({
    active: false,
    progress: 0,
    status: "",
    total: 0,
    isComplete: false,
  });

  const isEditing = Boolean(selectedItem);

  useEffect(() => {
    if (!isLoggedIn) return;
    void loadItems(activeTab);
  }, [activeTab, isLoggedIn]);

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bDate - aDate;
      }),
    [items]
  );

  const resetStatusLater = () => {
    window.setTimeout(() => setStatusMsg({ text: "", type: "" }), 4000);
  };

  const clearForm = () => {
    setFormData(INITIAL_FORM);
    setImageFile(null);
    setVideoFile(null);
    setGalleryFiles([]);
    setSelectedItem(null);
  };

  const loadItems = async (collection: CollectionKey) => {
    setListLoading(true);
    try {
      const response = await fetch(getApiUrl(`/api/${collection}`));
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to fetch");
      }
      const data = await response.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setStatusMsg({ text: err.message || `Could not load ${collectionLabels[collection].toLowerCase()} right now.`, type: "error" });
      resetStatusLater();
    } finally {
      setListLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.email === "ucskmschool@gmail.com" && credentials.password === "ucskm@789") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectTab = (tab: CollectionKey) => {
    setActiveTab(tab);
    clearForm();
    setStatusMsg({ text: "", type: "" });
    setGalleryProgress({ active: false, progress: 0, status: "", total: 0, isComplete: false });
  };

  const startEdit = (item: AdminItem) => {
    setSelectedItem(item);
    setFormData({
      title: item.title || "",
      videoId: item.videoId || "",
      description: item.description || "",
      excerpt: item.excerpt || "",
      image: item.image && !item.image.includes("/uploads/") ? item.image : "",
      category: item.category || "",
    });
    setImageFile(null);
    setVideoFile(null);
    setGalleryFiles([]);
    setStatusMsg({ text: "", type: "" });
  };

  const handleDelete = async (item: AdminItem) => {
    const confirmed = window.confirm("Do you want to delete this item?");
    if (!confirmed) return;

    setLoading(true);
    try {
      const response = await fetch(getApiUrl(`/api/${activeTab}/${item._id}`), { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");

      if (selectedItem?._id === item._id) {
        clearForm();
      }

      setStatusMsg({ text: "Item deleted successfully.", type: "success" });
      await loadItems(activeTab);
      resetStatusLater();
    } catch (_error) {
      setStatusMsg({ text: "Delete failed. Please try again.", type: "error" });
      resetStatusLater();
    } finally {
      setLoading(false);
    }
  };

  const validateStandardForm = () => {
    if (activeTab === "videos") {
      if (!formData.title.trim()) return "Video title is required.";
      if (!isEditing && !formData.videoId.trim() && !videoFile) return "Provide a YouTube ID or choose a video file.";
      return "";
    }

    if (activeTab === "blogs") {
      if (!formData.title.trim() || !formData.category.trim() || !formData.excerpt.trim() || !formData.description.trim()) {
        return "Title, category, excerpt, and description are required.";
      }
      if (!isEditing && !formData.image.trim() && !imageFile) return "Choose an image or enter an image URL.";
      return "";
    }

    if (activeTab === "books") {
      if (!formData.title.trim()) return "Book title is required.";
      if (!isEditing && !formData.image.trim() && !imageFile) return "Choose a book image or enter an image URL.";
      return "";
    }

    return "";
  };

  const submitStandardForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateStandardForm();
    if (validationError) {
      setStatusMsg({ text: validationError, type: "error" });
      resetStatusLater();
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
    if (imageFile) payload.append("image", imageFile);
    if (videoFile) payload.append("video", videoFile);

    setLoading(true);
    setStatusMsg({ text: "", type: "" });

    try {
      const endpoint = isEditing ? getApiUrl(`/api/${activeTab}/${selectedItem?._id}`) : getApiUrl(`/api/${activeTab}`);
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        body: payload,
      });

      if (!response.ok) throw new Error("Save failed");

      setStatusMsg({
        text: isEditing ? "Item updated successfully." : "Item created successfully.",
        type: "success",
      });
      clearForm();
      await loadItems(activeTab);
      resetStatusLater();
    } catch (_error) {
      setStatusMsg({ text: "Could not save this item. Please check the backend server.", type: "error" });
      resetStatusLater();
    } finally {
      setLoading(false);
    }
  };

  const uploadGalleryImages = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedItem) {
      if (!imageFile && !videoFile) {
        setStatusMsg({ text: "Choose a media file to replace this item.", type: "error" });
        resetStatusLater();
        return;
      }

      const payload = new FormData();
      if (imageFile) payload.append("image", imageFile);
      if (videoFile) payload.append("video", videoFile);
      payload.append("title", formData.title);

      setLoading(true);
      try {
        const response = await fetch(getApiUrl(`/api/gallery/${selectedItem._id}`), {
          method: "PUT",
          body: payload,
        });

        if (!response.ok) throw new Error("Update failed");

        setStatusMsg({ text: "Gallery item updated successfully.", type: "success" });
        clearForm();
        await loadItems("gallery");
        resetStatusLater();
      } catch (_error) {
        setStatusMsg({ text: "Gallery item update failed.", type: "error" });
        resetStatusLater();
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!galleryFiles.length) {
      setStatusMsg({ text: "Choose one or more gallery images first.", type: "error" });
      resetStatusLater();
      return;
    }

    setGalleryProgress({
      active: true,
      progress: 0,
      status: "Starting upload...",
      total: galleryFiles.length,
      isComplete: false,
    });

    const payload = new FormData();
    galleryFiles.forEach((file) => payload.append("files", file));

    try {
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", getApiUrl("/api/gallery/bulk-upload"));

        xhr.upload.onprogress = (event) => {
          if (!event.lengthComputable) return;
          const percent = Math.min(100, Math.round((event.loaded / event.total) * 100));
          setGalleryProgress((prev) => ({
            ...prev,
            progress: percent,
            status: `Sending ${galleryFiles.length} images...`,
          }));
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            setGalleryProgress((prev) => ({
              ...prev,
              progress: 100,
              status: "Complete",
              isComplete: true,
            }));
            resolve();
          } else {
            reject(new Error("Bulk upload failed"));
          }
        };

        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(payload);
      });

      setStatusMsg({ text: "All gallery images uploaded successfully.", type: "success" });
      setGalleryFiles([]);
      await loadItems("gallery");
      
      // Auto-close modal after a short delay
      setTimeout(() => {
        setGalleryProgress((prev) => ({ ...prev, active: false }));
      }, 2000);
      
      resetStatusLater();
    } catch (_error) {
      setGalleryProgress((prev) => ({ ...prev, status: "Upload failed", active: false }));
      setStatusMsg({ text: "Bulk gallery upload failed. Please try again.", type: "error" });
      resetStatusLater();
    } finally {
      setLoading(false);
    }
  };

  const renderMediaPreview = (item: AdminItem) => {
    if (activeTab === "videos" || (activeTab === "gallery" && item.type === "video")) {
      if (item.video) {
        return <video className="h-28 w-full rounded-lg object-cover bg-black" src={toAbsoluteMediaUrl(item.video)} controls={false} />;
      }

      if (item.videoId) {
        return (
          <img
            src={getYoutubeThumb(item.videoId)}
            alt={item.title || "Video thumbnail"}
            className="h-28 w-full rounded-lg object-cover"
          />
        );
      }
    }

    if (item.image) {
      return <img src={toAbsoluteMediaUrl(item.image)} alt={item.title || "Uploaded media"} className="h-28 w-full rounded-lg object-cover" />;
    }

    return (
      <div className="flex h-28 w-full items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
        No preview
      </div>
    );
  };

  const renderGalleryUploadModal = () => {
    if (!galleryProgress.active) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-background w-full max-w-md rounded-3xl shadow-2xl border p-8 space-y-8 animate-in zoom-in-95 duration-300">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative">
              <CircularUploadProgress progress={galleryProgress.progress} />
              {galleryProgress.isComplete && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-lg animate-in zoom-in duration-300">
                  <Save size={16} />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className={`text-2xl font-bold ${galleryProgress.isComplete ? "text-green-600" : "text-foreground"}`}>
                {galleryProgress.status}
              </h3>
              <p className="text-muted-foreground">
                {galleryProgress.isComplete 
                  ? "All images processed and saved." 
                  : `Uploading ${galleryProgress.total} images to your gallery...`}
              </p>
            </div>
            
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                <span>Progress</span>
                <span>{galleryProgress.progress}%</span>
              </div>
              <Progress value={galleryProgress.progress} className={`h-3 w-full bg-muted overflow-hidden rounded-full ${galleryProgress.isComplete ? "[&>div]:bg-green-500" : "[&>div]:bg-secondary"}`} />
            </div>

            {galleryProgress.isComplete && (
              <button 
                onClick={() => setGalleryProgress(prev => ({ ...prev, active: false }))}
                className="w-full py-3 bg-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                Close & View Gallery
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFormFields = () => {
    if (activeTab === "gallery") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold flex items-center gap-2">
              <ImageIcon size={16} className="text-secondary" />
              {isEditing ? "Modify Gallery Item" : "Bulk Upload Images & Videos"}
            </label>
            <div className="relative group">
              <input
                type="file"
                accept="image/*,video/*"
                multiple={!isEditing}
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (isEditing) {
                    setImageFile(files[0] || null);
                  } else {
                    setGalleryFiles(files);
                  }
                }}
                className="block w-full text-sm text-muted-foreground
                  file:mr-4 file:py-3 file:px-6
                  file:rounded-xl file:border-0
                  file:text-sm file:font-bold
                  file:bg-secondary/10 file:text-secondary
                  hover:file:bg-secondary/20
                  cursor-pointer bg-muted/30 rounded-2xl border border-dashed border-border p-4 transition-all
                  hover:border-secondary/50"
              />
            </div>
            <p className="text-xs text-muted-foreground px-1">
              {isEditing
                ? "Select a new image or video from your device to replace this item."
                : "You can select multiple images and videos from your system to upload in bulk."}
            </p>
          </div>

          {isEditing && (
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2">
                <FileText size={16} className="text-secondary" />
                Gallery Item Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter a title for this item"
                className="w-full rounded-xl border px-4 py-3 bg-background outline-none focus:ring-1 focus:ring-secondary"
              />
              <p className="text-xs text-muted-foreground px-1">This title will only be visible in the admin panel.</p>
            </div>
          )}

          {!isEditing && galleryFiles.length > 0 && (
            <div className="rounded-2xl border bg-secondary/5 p-5 animate-in slide-in-from-top duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-secondary flex items-center gap-2">
                  <FileText size={16} /> {galleryFiles.length} file(s) ready
                </p>
                <button 
                  type="button" 
                  onClick={() => setGalleryFiles([])} 
                  className="text-xs font-semibold text-red-500 hover:underline"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto no-scrollbar">
                {galleryFiles.map((file, idx) => (
                  <span key={`${file.name}-${idx}`} className="text-[10px] sm:text-xs font-medium rounded-lg bg-background border px-3 py-1.5 shadow-sm">
                    {file.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold">
            {activeTab === "videos" ? "Video Title" : activeTab === "blogs" ? "Article Title" : "Book Title"}
          </label>
          <input
            required
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            type="text"
            placeholder={activeTab === "videos" ? "Enter video title" : "Enter title"}
            className="w-full rounded-lg border px-4 py-2.5 bg-background outline-none focus:ring-1 focus:ring-secondary"
          />
        </div>

        {activeTab === "videos" && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold">YouTube Video ID</label>
              <input
                name="videoId"
                value={formData.videoId}
                onChange={handleInputChange}
                type="text"
                placeholder="Example: 3ru7WBY4x8E"
                className="w-full rounded-lg border px-4 py-2.5 bg-background outline-none focus:ring-1 focus:ring-secondary"
              />
              <p className="text-xs text-muted-foreground">Leave this empty if you want to upload a video file from the device.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Upload Video From Device</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                className="w-full rounded-lg border px-4 py-3 bg-background"
              />
            </div>
          </>
        )}

        {(activeTab === "blogs" || activeTab === "books") && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Image URL</label>
              <input
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-lg border px-4 py-2.5 bg-background outline-none focus:ring-1 focus:ring-secondary"
              />
              <p className="text-xs text-muted-foreground">You can keep using URLs, or choose a local file below.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Upload Image From Device</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full rounded-lg border px-4 py-3 bg-background"
              />
            </div>
          </>
        )}

        {activeTab === "blogs" && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                type="text"
                placeholder="Leadership"
                className="w-full rounded-lg border px-4 py-2.5 bg-background outline-none focus:ring-1 focus:ring-secondary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Short Excerpt</label>
              <textarea
                rows={2}
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Short summary..."
                className="w-full rounded-lg border px-4 py-2.5 bg-background outline-none focus:ring-1 focus:ring-secondary"
              />
            </div>
          </>
        )}

        {(activeTab === "blogs" || activeTab === "books") && (
          <div className="space-y-2">
            <label className="text-sm font-semibold">Description</label>
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Write details here..."
              className="w-full rounded-lg border px-4 py-2.5 bg-background outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>
        )}

        {isEditing && selectedItem && (
          <div className="rounded-xl border bg-muted/30 p-4 text-sm">
            <p className="font-semibold">Currently saved media</p>
            <div className="mt-3">
              {activeTab === "videos" && selectedItem.type === "upload" && selectedItem.video ? (
                <video className="h-36 w-full rounded-lg object-cover bg-black" src={toAbsoluteMediaUrl(selectedItem.video)} controls />
              ) : selectedItem.image ? (
                <img className="h-36 w-full rounded-lg object-cover" src={toAbsoluteMediaUrl(selectedItem.image)} alt={selectedItem.title || "Current"} />
              ) : selectedItem.videoId ? (
                <img className="h-36 w-full rounded-lg object-cover" src={getYoutubeThumb(selectedItem.videoId)} alt={selectedItem.title || "Current"} />
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-screen bg-muted/30 py-10 px-4 flex items-center justify-center pt-24 sm:pt-32">
        <div className="max-w-md w-full bg-background rounded-2xl shadow-xl overflow-hidden border border-border p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-secondary" />
            </div>
            <h2 className="font-heading text-3xl font-bold">drkaushik.org Admin</h2>
            <p className="text-muted-foreground mt-2 text-sm">Sign in to manage website assets</p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 border border-red-200 rounded flex gap-2 items-center text-sm font-medium">
              <AlertCircle size={16} /> {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <User size={14} /> Email Address
              </label>
              <input
                autoFocus
                required
                type="email"
                placeholder="admin@example.com"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full border rounded-lg px-4 py-2.5 bg-muted/30 focus:bg-background focus:ring-2 focus:ring-secondary outline-none transition-all"
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Lock size={14} /> Password
              </label>
              <input
                required
                type="password"
                placeholder="........"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full border rounded-lg px-4 py-2.5 bg-muted/30 focus:bg-background focus:ring-2 focus:ring-secondary outline-none transition-all"
              />
            </div>
            <button type="submit" className="w-full btn-speaker bg-secondary text-white flex justify-center mt-2 py-3 rounded-xl border-0">
              Secure Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-muted/30 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
      <div className="max-w-7xl mx-auto bg-background rounded-2xl shadow-xl overflow-hidden border border-border">
        <div className="flex flex-col md:flex-row min-h-[78vh]">
          <div className="w-full md:w-64 bg-card border-b md:border-b-0 md:border-r border-border p-4 sm:p-6 shrink-0 flex flex-col">
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground">Admin Menu</h2>
              <button onClick={() => setIsLoggedIn(false)} className="md:hidden flex items-center gap-1 text-xs text-red-500 font-semibold">
                <LogOut size={14} /> Logout
              </button>
            </div>

            <div className="flex overflow-x-auto pb-2 md:pb-0 md:flex-col gap-2 no-scrollbar">
              <button onClick={() => selectTab("videos")} className={`whitespace-nowrap flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 rounded-lg transition-colors ${activeTab === "videos" ? "bg-secondary text-secondary-foreground font-semibold shadow-sm" : "hover:bg-muted text-muted-foreground"}`}>
                <Video size={18} /> <span className="text-sm sm:text-base">Videos</span>
              </button>
              <button onClick={() => selectTab("blogs")} className={`whitespace-nowrap flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 rounded-lg transition-colors ${activeTab === "blogs" ? "bg-secondary text-secondary-foreground font-semibold shadow-sm" : "hover:bg-muted text-muted-foreground"}`}>
                <FileText size={18} /> <span className="text-sm sm:text-base">Articles</span>
              </button>
              <button onClick={() => selectTab("books")} className={`whitespace-nowrap flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 rounded-lg transition-colors ${activeTab === "books" ? "bg-secondary text-secondary-foreground font-semibold shadow-sm" : "hover:bg-muted text-muted-foreground"}`}>
                <Book size={18} /> <span className="text-sm sm:text-base">Books</span>
              </button>
              <button onClick={() => selectTab("gallery")} className={`whitespace-nowrap flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 rounded-lg transition-colors ${activeTab === "gallery" ? "bg-secondary text-secondary-foreground font-semibold shadow-sm" : "hover:bg-muted text-muted-foreground"}`}>
                <ImageIcon size={18} /> <span className="text-sm sm:text-base">Gallery</span>
              </button>
            </div>

            <button onClick={() => setIsLoggedIn(false)} className="mt-auto hidden md:flex items-center justify-center gap-2 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-semibold">
              <LogOut size={16} /> Secure Logout
            </button>
          </div>

          <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 w-full overflow-y-auto">
            {renderGalleryUploadModal()}
            <div className="flex flex-col gap-3 mb-6 sm:mb-8 pb-4 border-b border-border sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold capitalize">
                  {activeTab === "gallery"
                    ? isEditing
                      ? "Replace Gallery Image"
                      : "Bulk Upload Gallery Images"
                    : `${isEditing ? "Edit" : "Add"} ${activeTab === "blogs" ? "Article" : activeTab === "books" ? "Book" : "Video"}`}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === "gallery"
                    ? "Gallery items now store only images. Titles and descriptions stay hidden from this section."
                    : "Choose files from the device or keep using URLs where needed."}
                </p>
              </div>

              {isEditing && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted"
                >
                  <X size={16} /> Cancel Edit
                </button>
              )}
            </div>

            {statusMsg.text && (
              <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${statusMsg.type === "error" ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
                <AlertCircle size={18} className="shrink-0" />
                <p className="font-medium text-sm">{statusMsg.text}</p>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] gap-6">
              <form
                onSubmit={activeTab === "gallery" ? uploadGalleryImages : submitStandardForm}
                className="space-y-5 sm:space-y-6 bg-card border border-border rounded-xl p-5 sm:p-8 shadow-sm"
              >
                {renderFormFields()}
                <div className="pt-4 border-t border-border mt-6 sm:mt-8 flex flex-wrap gap-3 justify-end">
                  {loading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mr-auto">
                      <Loader2 size={16} className="animate-spin" /> Processing...
                    </div>
                  )}
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full sm:w-auto btn-speaker bg-secondary text-white border-0 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {activeTab === "gallery" && !isEditing ? <Upload size={16} /> : <Save size={16} />}
                    {loading
                      ? "Saving..."
                      : activeTab === "gallery"
                        ? isEditing
                          ? "Replace Image"
                          : "Upload Images"
                        : isEditing
                          ? "Update Item"
                          : "Save Item"}
                  </button>
                </div>
              </form>

              <div className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div>
                    <h4 className="font-heading text-lg sm:text-xl font-bold">Manage {collectionLabels[activeTab]}</h4>
                    <p className="text-sm text-muted-foreground">
                      {sortedItems.length} saved item{sortedItems.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <button type="button" onClick={() => loadItems(activeTab)} className="rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-muted">
                    Refresh
                  </button>
                </div>

                {listLoading ? (
                  <div className="flex items-center justify-center py-16 text-muted-foreground">
                    <Loader2 className="animate-spin mr-2" size={18} /> Loading items...
                  </div>
                ) : sortedItems.length === 0 ? (
                  <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                    No {collectionLabels[activeTab].toLowerCase()} saved yet.
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                    {sortedItems.map((item) => (
                      <div key={item._id} className="rounded-xl border p-4">
                        {renderMediaPreview(item)}
                        <div className="mt-4 space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h5 className="font-semibold text-base">
                                {item.title || (activeTab === "gallery" 
                                  ? item.type === "video" 
                                    ? "Gallery Video" 
                                    : "Gallery Image" 
                                  : "Untitled")}
                              </h5>
                              <p className="text-xs text-muted-foreground">
                                {activeTab === "videos"
                                  ? item.type === "upload"
                                    ? "Uploaded video file"
                                    : `YouTube ID: ${item.videoId || "Not set"}`
                                  : activeTab === "gallery"
                                    ? item.type === "video" 
                                      ? "Video file from system" 
                                      : "Image only"
                                    : item.category || "No category"}
                              </p>
                            </div>
                            {item.createdAt && (
                              <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>

                          {activeTab === "blogs" && item.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                          )}
                          {(activeTab === "blogs" || activeTab === "books") && item.description && (
                            <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                          )}

                          <div className="flex flex-wrap gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => startEdit(item)}
                              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-muted"
                            >
                              <Pencil size={14} /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item)}
                              className="inline-flex items-center gap-2 rounded-lg border border-red-200 text-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-50"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
