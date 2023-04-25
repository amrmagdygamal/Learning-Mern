import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/notes";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NoteApi from "../network/notes_api";

interface DialogAddEditNoteProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSave: (note: Note) => void;
}

function AddEditNotes({
  noteToEdit,
  onDismiss,
  onNoteSave,
}: DialogAddEditNoteProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;

      if (noteToEdit) {
        noteResponse = await NoteApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NoteApi.creatNote(input);
      }

      onNoteSave(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header className="wood" closeButton>
        <Modal.Title className="wood">
          {noteToEdit ? "Edit note" : "Add note"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="wood">
        <Form
          className="wood"
          id="addEditNote"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
             className='input'
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
              className='input'
              placeholder="Text"
              rows={5}
              {...register("text")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="wood">
        <Button variant="secondary" onClick={onDismiss}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="add-button"
          form="addEditNote"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding note..." : noteToEdit ? "Edit note" : "Add note"}
          
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEditNotes;
