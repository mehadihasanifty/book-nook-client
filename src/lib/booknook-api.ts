export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export async function getApiToken() {
  const response = await fetch("/api/token", { cache: "no-store" });
  const data = await response.json();
  if (!response.ok || !data.token)
    throw new Error(data.message || "Please sign in again.");
  return data.token as string;
}

export async function apiRequest(path: string, init: RequestInit = {}) {
  const token = await getApiToken();
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !(init.body instanceof FormData))
    headers.set("Content-Type", "application/json");
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(data.message || "The request could not be completed.");
  return data;
}
