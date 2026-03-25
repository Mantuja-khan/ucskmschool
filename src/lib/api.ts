const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.drkaushik.org";

export const getApiUrl = (path: string) => `${API_BASE_URL}${path}`;

export const toAbsoluteMediaUrl = (value?: string | null) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${API_BASE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

export { API_BASE_URL };
