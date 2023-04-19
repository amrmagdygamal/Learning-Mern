import React, { useEffect, useState } from "react";
import "./App.css";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Note/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as NotesApi from "./network/notes_api";
import AddingNotes from "./components/AddingNotes";
import { FaPlus } from 'react-icons/fa';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showDialogAdd, setShowDialogAdd] = useState(false);

  useEffect(() => {
    async function getNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
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

  return (
    <Container className="w-85">
      <Button
        onClick={() => setShowDialogAdd(true)}
        className="m-3 w-25 d-block mx-auto"
      >
        <FaPlus />Add New Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} onDeleteClicked={deleteNote} />
          </Col>
        ))}
      </Row>
      {showDialogAdd && (
        <AddingNotes
          onDismiss={() => setShowDialogAdd(false)}
          onNoteSave={(newNote) => {
            setNotes([...notes, newNote]);
            setShowDialogAdd(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
