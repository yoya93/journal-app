import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNotes } from "../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();

  const { active: note } = useSelector((state) => state.notes);

  const handleSaved = () => {
    dispatch(startSaveNotes(note));
  };
  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>
      <div>
        <button className="btn">Picture</button>
        <button onClick={handleSaved} className="btn">
          Save
        </button>
      </div>
    </div>
  );
};
