/**
 * Client for the PHP admin API (see api/README.md). Talks to /api on the same
 * origin in production; override with VITE_API_BASE for split-origin local dev.
 *
 * Session lives in an HttpOnly cookie (credentials: "include"). Mutations must
 * carry the CSRF token in the X-CSRF-Token header — we cache the token returned
 * by /auth/login, /auth/me and /auth/csrf and attach it automatically.
 */

const API_BASE = ((import.meta.env.VITE_API_BASE as string | undefined) ?? "/api").replace(
  /\/$/,
  "",
);

let csrfToken: string | null = null;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ReqOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  /** When true, `body` is sent as-is (FormData) and no JSON header is set. */
  form?: boolean;
};

async function req<T>(path: string, opts: ReqOptions = {}): Promise<T> {
  const { method = "GET", body, form = false } = opts;
  const headers: Record<string, string> = {};
  if (!form && body !== undefined) headers["Content-Type"] = "application/json";
  if (method !== "GET" && csrfToken) headers["X-CSRF-Token"] = csrfToken;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    headers,
    body: form ? (body as BodyInit) : body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : null;

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "error" in data && String((data as { error: unknown }).error)) ||
      `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }
  return data as T;
}

function rememberCsrf(payload: { csrfToken?: string }): void {
  if (payload && typeof payload.csrfToken === "string") csrfToken = payload.csrfToken;
}

// ── Types (mirror the API responses) ────────────────────────────────────────

export type AdminUser = { id: number; email: string; role: string; lastLoginAt?: string | null };

export type MenuCategory = {
  id: number;
  name: string;
  slug: string;
  imageSrc: string | null;
  imageAlt: string | null;
  sortOrder: number;
  isPublished: boolean;
};

export type MenuItem = {
  id: number;
  categoryId: number;
  group: string | null;
  name: string;
  slug: string;
  description: string | null;
  price: number | null;
  /** Per-dish photo; null falls back to the category banner on the public site. */
  imageSrc: string | null;
  imageAlt: string | null;
  isAvailable: boolean;
  sortOrder: number;
};

export type GalleryCategory = "Rooms" | "Dining" | "Grounds" | "Wellness";
export type GalleryImage = {
  id: number;
  category: GalleryCategory;
  caption: string | null;
  src: string;
  alt: string | null;
  sortOrder: number;
  isPublished: boolean;
};

export type RoomImage = {
  id: number;
  src: string;
  alt: string | null;
  isCover: boolean;
  sortOrder: number;
};
export type Room = {
  id: number;
  no: string;
  slug: string;
  tag: string | null;
  name: string;
  description: string | null;
  beds: string | null;
  view: string | null;
  price: number | null;
  sortOrder: number;
  isPublished: boolean;
  images: RoomImage[];
};

// ── Auth ────────────────────────────────────────────────────────────────────

export const auth = {
  async me(): Promise<AdminUser> {
    const r = await req<{ user: AdminUser; csrfToken: string }>("/auth/me");
    rememberCsrf(r);
    return r.user;
  },
  async login(email: string, password: string): Promise<AdminUser> {
    const r = await req<{ user: AdminUser; csrfToken: string }>("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    rememberCsrf(r);
    return r.user;
  },
  async logout(): Promise<void> {
    await req("/auth/logout", { method: "POST" });
    csrfToken = null;
  },
};

// ── Menu ────────────────────────────────────────────────────────────────────

export const menuApi = {
  categories: () => req<{ categories: MenuCategory[] }>("/menu/categories").then((r) => r.categories),
  items: (categoryId?: number) =>
    req<{ items: MenuItem[] }>(`/menu/items${categoryId ? `?category=${categoryId}` : ""}`).then(
      (r) => r.items,
    ),
  createItem: (body: Partial<MenuItem>) =>
    req<{ id: number }>("/menu/items", { method: "POST", body }),
  updateItem: (id: number, body: Partial<MenuItem>) =>
    req<{ ok: true }>(`/menu/items/${id}`, { method: "PUT", body }),
  deleteItem: (id: number) => req<{ ok: true }>(`/menu/items/${id}`, { method: "DELETE" }),
  updateCategory: (id: number, body: Partial<MenuCategory>) =>
    req<{ ok: true }>(`/menu/categories/${id}`, { method: "PUT", body }),
};

// ── Gallery ─────────────────────────────────────────────────────────────────

export const galleryApi = {
  all: () => req<{ images: GalleryImage[] }>("/gallery?all=1").then((r) => r.images),
  create: (body: Partial<GalleryImage>) =>
    req<{ id: number }>("/gallery", { method: "POST", body }),
  update: (id: number, body: Partial<GalleryImage>) =>
    req<{ ok: true }>(`/gallery/${id}`, { method: "PUT", body }),
  remove: (id: number) => req<{ ok: true }>(`/gallery/${id}`, { method: "DELETE" }),
};

// ── Rooms ───────────────────────────────────────────────────────────────────

export const roomsApi = {
  all: () => req<{ rooms: Room[] }>("/rooms?all=1").then((r) => r.rooms),
  create: (body: Partial<Room>) => req<{ id: number }>("/rooms", { method: "POST", body }),
  update: (id: number, body: Partial<Room>) =>
    req<{ ok: true }>(`/rooms/${id}`, { method: "PUT", body }),
  remove: (id: number) => req<{ ok: true }>(`/rooms/${id}`, { method: "DELETE" }),
  addImage: (roomId: number, body: Partial<RoomImage>) =>
    req<{ id: number }>(`/rooms/${roomId}/images`, { method: "POST", body }),
  removeImage: (roomId: number, imageId: number) =>
    req<{ ok: true }>(`/rooms/${roomId}/images/${imageId}`, { method: "DELETE" }),
};

// ── Uploads ─────────────────────────────────────────────────────────────────

export type UploadDir = "rooms" | "gallery" | "menu";
export async function uploadImage(file: File, dir: UploadDir): Promise<{ src: string }> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("dir", dir);
  return req<{ src: string }>("/uploads", { method: "POST", body: fd, form: true });
}
