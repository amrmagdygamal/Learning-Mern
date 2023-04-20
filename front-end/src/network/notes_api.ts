import { Note } from "../models/notes";

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

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchWithError("/notes", { method: "GET" });

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
