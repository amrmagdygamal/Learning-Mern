import React from 'react';
import { Note as NoteModel } from '../../models/notes';
import { Card } from 'react-bootstrap';
import './Note.css';
import { formatDate } from '../../utils/formatDate';
import { MdDelete } from 'react-icons/md';

interface NoteProps {
  note: NoteModel,
  onDeleteClicked: (note: NoteModel) => void,
}

const Note =  ({ note, onDeleteClicked }: NoteProps) => {


  const {
    title,
    text,
    createdAt,
    updatedAt,
  } = note;

let createdUpdated: string;
if(updatedAt > createdAt) {
  createdUpdated = "Updated: " + formatDate(updatedAt);
}else {
  createdUpdated = "Created: " + formatDate(createdAt);
}

  return (
    <div>
      <Card className='card__container'>
        <Card.Body className='card__container-body'>
          <Card.Title>
            {title}
            <MdDelete className='float-end' onClick={(e) => {
              onDeleteClicked(note);
              e.stopPropagation();
            }} /> 
          </Card.Title>
          <Card.Text>
            {text}
          </Card.Text>
        
        </Card.Body>
        <Card.Footer>
          {createdUpdated}
        </Card.Footer>
      </Card>
    </div>
  )
}

export default Note