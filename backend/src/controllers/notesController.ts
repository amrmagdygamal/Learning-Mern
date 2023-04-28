import { RequestHandler } from "express";
import NoteModel from '../moduls/note'
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { DefineId } from "../Util/DefineId";

export const getNotes: RequestHandler = async  (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {

    DefineId(authenticatedUserId);
    
    const notes = await NoteModel.find({userId: authenticatedUserId}).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authenticatedUserId = req.session.userId;
  try {

    DefineId(authenticatedUserId);


    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    if(!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(403, "You are not allowed to get this note");
    }
    res.status(200).json(note);

  } catch (error) {
    next(error);
  }
};

interface CreateNotesBody {
  title?: string,
  text?: string
}

export  const createNotes: RequestHandler<unknown, unknown, CreateNotesBody, unknown> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const title = req.body.title;
  const text = req.body.text;
  try {
    DefineId(authenticatedUserId);
    if (!title) {
      throw createHttpError(400, "Note must have a title!")
    }
    const newNote = await NoteModel.create({ title, text, userId: authenticatedUserId });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};


interface updateNoteParams {
  noteId: string
}

interface updateNoteBody  {
  title?: string,
  text?: string
}

export const updateNote: RequestHandler<updateNoteParams, unknown,updateNoteBody, unknown> = async(req, res, next) => {
  
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const authenticatedUserId = req.session.userId;
  
  try {

    DefineId(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    if (!newTitle) {
      throw createHttpError(400, "Note must have a title!")
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    if(!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(403, "You cannot access this note");
    }

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error)
  }
};

export const deleteNote: RequestHandler = async(req, res, next) => {
  const noteId = req.params.noteId;
  const authenticatedUserId = req.session.userId;

  try {
    DefineId(authenticatedUserId);
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    
    if(!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(403, "You cannot delete this note");
    }

    await note.deleteOne();
    res.sendStatus(204);
      
  } catch (error) {
    next(error);
  }
}