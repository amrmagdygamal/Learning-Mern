import React, { useEffect, useState } from "react";
import "./App.css";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Note/Note";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import * as NotesApi from "./network/notes_api";
import AddingNotes from "./components/AddEditNotes";
import { FaPlus } from 'react-icons/fa';
import AddEditNotes from "./components/AddEditNotes";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [notesLoading, setNotesLoading] = useState(true);

  const [showNotesLoadingErrors, setShowNotesLoadingErrors] = useState(false);

  const [showDialogAdd, setShowDialogAdd] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null)

  useEffect(() => {
    async function getNotes() {
      try {
        setShowNotesLoadingErrors(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingErrors(true);
      } finally {
        setNotesLoading(false);
      }
    }

    getNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }



  const notesLayout = 
  <Row xs={1} md={2} xl={3} className="g-4 w-100">
  {notes.map((note) => (
    <Col key={note._id}>
      <Note
      note={note}
      onDeleteClicked={deleteNote}
      onNoteClicked={setNoteToEdit}  />
    </Col>
  ))}
</Row>





  return (
    <Container className="w-100 d-flex flex-column align-items-center">
      <Button
        onClick={() => setShowDialogAdd(true)}
        className="m-3 w-25 d-block mx-auto add-button"
      >
        <FaPlus className=""/>  Add New Note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingErrors && <h2 className="alert alert-heading alert-warning">Something went wrong. Please refresh the page.</h2>}

      {!notesLoading && !showNotesLoadingErrors && 
        <>
          {notes.length > 0 
            ? notesLayout
            : <h2 className="">You don't have any notes yet.</h2>
          }
        </>
      }

      {showDialogAdd && (
        <AddingNotes
          onDismiss={() => setShowDialogAdd(false)}
          onNoteSave={(newNote) => {
            setNotes([...notes, newNote]);
            setShowDialogAdd(false);
          }}
        />
      )}
      {noteToEdit && 
      <AddEditNotes 
        noteToEdit={noteToEdit}
        onDismiss={() => setNoteToEdit(null)}
        onNoteSave={(updateNote) => {
          setNotes(notes.map(existingNote => existingNote._id === updateNote._id ? updateNote : existingNote))
          setNoteToEdit(null);
        }}
      />
      }
    </Container>
  );
}

export default App;
