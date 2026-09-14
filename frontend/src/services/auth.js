const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, body) {
  const response = await fetch(`${API_URL}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}
export const signupUser = (formData) => request("/auth/signup", formData);
export const loginUser = (formData) => request("/auth/login", formData);

async function authenticatedRequest(path, options = {}) {
  const token = localStorage.getItem("zeromindToken");
  if (!token) throw new Error("Your session has expired. Please log in again.");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...options.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}

export const getAIs = () => authenticatedRequest("/ais");
export const createAI = (ai) => authenticatedRequest("/ais", { method: "POST", body: JSON.stringify(ai) });
export const updateAI = (aiId, ai) => authenticatedRequest(`/ais/${aiId}`, { method: "PUT", body: JSON.stringify(ai) });
export const deleteAI = (aiId) => authenticatedRequest(`/ais/${aiId}`, { method: "DELETE" });
export const getChats = (aiId, conversationId) => authenticatedRequest(`/chat/${aiId}${conversationId ? `?conversationId=${conversationId}` : ""}`);
export const deleteConversation = (aiId, conversationId) => authenticatedRequest(`/chat/${aiId}/${conversationId}`, { method: "DELETE" });
export const createConversation = (aiId, modelPreference = "Medium") => authenticatedRequest(`/chat/${aiId}/conversations`, { method: "POST", body: JSON.stringify({ modelPreference }) });
export const sendChat = (aiId, message) => authenticatedRequest(`/chat/${aiId}`, { method: "POST", body: JSON.stringify(message) });

export async function getCurrentUser() {
  const token = localStorage.getItem("zeromindToken");
  if (!token) throw new Error("Not logged in");
  const response = await fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Your session has expired.");
  return data.user;
}

export const updateCurrentUser = (user) => authenticatedRequest("/auth/me", { method: "PUT", body: JSON.stringify(user) });
export const updatePassword = (passwords) => authenticatedRequest("/auth/me/password", { method: "PUT", body: JSON.stringify(passwords) });

export function saveSession(token, user) {
  localStorage.setItem("zeromindToken", token);
  localStorage.setItem("zeromindUser", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("zeromindToken");
  localStorage.removeItem("zeromindUser");
}
