import React, { useEffect, useState } from "react";
import "./App.css";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Note/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as NotesApi from "./network/notes_api";
import AddingNotes from "./components/AddingNotes";

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

  return (
    <Container>
      <Button onClick={() => setShowDialogAdd(true)} className="m-3">
        Add New Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} />
          </Col>
        ))}
      </Row>
      {showDialogAdd && (
        <AddingNotes
          onDismiss={() => setShowDialogAdd(false)}
          onNoteSave={() => {}}
        />
      )}
    </Container>
  );
}

export default App;
