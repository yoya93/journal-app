import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNotes, startUploading } from "../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();

  const { active: note } = useSelector((state) => state.notes);

  const handleSaved = () => {
    dispatch(startSaveNotes(note));
  };
  const handleUploadImage = () => {
    document.querySelector("#uploadFile").click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>

      <input
        id="uploadFile"
        name="file"
        onChange={handleChange}
        style={{ display: "none" }}
        type="file"
      ></input>
      <div>
        <button onClick={handleUploadImage} className="btn">
          Picture
        </button>
        <button onClick={handleSaved} className="btn">
          Save
        </button>
      </div>
    </div>
  );
};
