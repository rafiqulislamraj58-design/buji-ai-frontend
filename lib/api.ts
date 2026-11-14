import axios, { AxiosError } from "axios";
import type { ApiEnvelope, ClassItem, Flashcard, Subject, Topic, User } from "./types";

/**
 * NEXT_PUBLIC_API_URL must include the `/api/v1` prefix
 */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://bujhi-ai-2.onrender.com/api/v1").replace(/\/$/, "");

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 🚀 Vercel থেকে Render-এ কুকি পাঠানোর জন্য এটা পারফেক্ট!
  timeout: 90_000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// 🚀 IMPROVEMENT: Global Error Interceptor (প্রো-লেভেল ডিবাগিং)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // যদি /auth/me ছাড়া অন্য কোনো রাউটে 401 (Unauthorized) আসে, তার মানে সেশন এক্সপায়ার হয়েছে
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/me')) {
      console.warn("Session expired or unauthorized. Please login again.");
      // চাইলে এখানে অটোমেটিক লগইন পেজে রিডাইরেক্ট করে দিতে পারেন:
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const e = err as AxiosError<{ message?: string }>;
    if (e.response?.data?.message) return e.response.data.message;
    if (e.code === "ECONNABORTED") return "সার্ভার সাড়া দিতে দেরি করছে। একটু পরে আবার চেষ্টা করুন।";
    if (!e.response) return "সার্ভারের সাথে সংযোগ করা যাচ্ছে না। ইন্টারনেট বা API URL চেক করুন।";
  }
  return "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।";
}

// ---------- Auth ----------
export const googleLoginUrl = `${API_URL}/auth/google`;
export const loginWithGoogle = () => { window.location.href = googleLoginUrl; };
export const logout = () => api.post("/auth/logout");

export const fetchMe = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<{ success: boolean; user: User }>("/auth/me");
    return data.user;
  } catch {
    // 401 = not signed in (এটা কনসোলে দেখালে ভয়ের কিছু নেই)
    return null; 
  }
};

// ---------- Academic ----------
export const getClasses = async () =>
  (await api.get<ApiEnvelope<ClassItem[]>>("/academic/classes")).data.data;
export const getSubjects = async (classId: string) =>
  (await api.get<ApiEnvelope<Subject[]>>(`/academic/classes/${classId}/subjects`)).data.data;
export const getTopics = async (subjectId: string) =>
  (await api.get<ApiEnvelope<Topic[]>>(`/academic/subjects/${subjectId}/topics`)).data.data;

// ---------- AI ----------
export const askAI = async (question: string) =>
  (await api.post<{ success: boolean; answer: string }>("/ai/ask", { question })).data.answer;

export const generateFlashcards = async (textContent: string, count = 5) =>
  (await api.post<ApiEnvelope<Flashcard[]>>("/ai/admin/generate-flashcards", { textContent, count })).data.data;

export const saveFlashcards = async (topicId: string, flashcards: Flashcard[]) =>
  (await api.post<ApiEnvelope<Flashcard[]>>("/ai/admin/save-flashcards", { topicId, flashcards })).data;

export const getFlashcards = async (topicId: string) =>
  (await api.get<ApiEnvelope<Flashcard[]>>(`/ai/topics/${topicId}/flashcards`)).data.data;