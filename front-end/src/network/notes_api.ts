import { Note } from "../models/notes";
import { User } from "../models/users";

async function fetchWithError(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;

    throw Error(errorMessage);
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchWithError("/api/users", { method: "GET" });
  return response.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signup(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchWithError("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchWithError("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchWithError("/api/users/logout", { method: "POST"});
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchWithError("/api/notes", { method: "GET" });

  return response.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function creatNote(note: NoteInput): Promise<Note> {
  const response = await fetchWithError("/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchWithError("/notes/" + noteId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchWithError("/notes/" + noteId, {
    method: "DELETE",
  });
}
