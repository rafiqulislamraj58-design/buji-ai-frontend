export interface ApiEnvelope<T> { success: boolean; data: T; message?: string; count?: number }

export interface ClassItem { _id: string; name: string; level: "School" | "College" | "University" }
export interface Subject { _id: string; name: string; classId: string; description?: string }
export interface Topic { _id: string; title: string; subjectId: string; order?: number }
export interface Flashcard { _id?: string; topicId?: string; question: string; answer: string }
export interface User { _id: string; displayName: string; email: string; avatarUrl?: string; role?: string }
