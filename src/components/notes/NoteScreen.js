import React from "react";
import { NotesAppBar } from "./NotesAppBar";
import { useForm } from "../../hooks/useForm";
import { useSelector } from "react-redux";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);

  const [formValues, handleInputChange] = useForm(note);
  console.log(formValues);

  const { body, title } = formValues;

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
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          onChange={handleInputChange}
          value={body}
        ></textarea>

        <div className="notes__image">
          <img
            src="data:image/jpeg;base64,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"
            alt="img"
          ></img>
        </div>
      </div>
    </div>
  );
};
