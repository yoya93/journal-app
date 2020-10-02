import React, { useEffect, useRef } from "react";
import { NotesAppBar } from "./NotesAppBar";
import { useForm } from "../../hooks/useForm";
import { useSelector, useDispatch } from "react-redux";
import { activeNotes, startDeleting } from "../actions/notes";

export const NoteScreen = () => {
  const dispatch = useDispatch();

  const { active: note } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useForm(note);

  const { body, title } = formValues;

  const actNote = useRef(note.id);

  useEffect(() => {
    if (note.id !== actNote.current) {
      reset(note);

      actNote.current = note.id;
    }
  }, [note, reset]);

  const handleDelete = () => {
    dispatch(startDeleting(note.id));
  };

  useEffect(() => {
    dispatch(activeNotes(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          onChange={handleInputChange}
          value={title}
          name="title"
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          onChange={handleInputChange}
          value={body}
          name="body"
        ></textarea>

        {note.imageUrl && (
          <div className="notes__image">
            <img src={note.imageUrl} alt="img"></img>
          </div>
        )}
      </div>

      <button onClick={handleDelete} className="btn btn-danger">
        Delete
      </button>
    </div>
  );
};
