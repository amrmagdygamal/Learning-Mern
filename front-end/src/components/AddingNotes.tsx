import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/notes";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NoteApi from "../network/notes_api";

interface DialogAddNoteProps {
  onDismiss: () => void;
  onNoteSave: (note: Note) => void;
}

function AddingNotes({ onDismiss, onNoteSave }: DialogAddNoteProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();

  async function onSubmit(input: NoteInput) {
    try {
      const noteResponse = await NoteApi.creatNote(input);
      onNoteSave(noteResponse);
      onDismiss();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addNote" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              {...register("title", { required: "Required" })}
            />
            {errors.title && (
              <Form.Text className="text-danger">Title is required</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Text"
              rows={5}
              {...register("text")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onDismiss}>
          Cancel
        </Button>
        <Button
          type="submit" 
          form="addNote"
          disabled={isSubmitting}>
          {isSubmitting ? "Adding note..." : "Add Note"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddingNotes;
