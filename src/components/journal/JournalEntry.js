import React from "react";

import moment from "moment";
import { activeNotes } from "../actions/notes";
import { useDispatch } from "react-redux";

export const JournalEntry = ({ id, title, body, imageUrl, date }) => {
  const dispatch = useDispatch();
  const dateNote = moment(date);

  const note = {
    id,
    title,
    body,
    date,
    imageUrl,
  };

  const handleActiveNote = () => {
    dispatch(activeNotes(id, note));
  };
  return (
    <div onClick={handleActiveNote} className="journal__entry pointer">
      {imageUrl && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
      )}

      <div className="journal-entry-body">
        <p className="journal-entry-title">{title}</p>
        <p className="journal-entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span className="journal__entry-date-box-span">
          {dateNote.format("dddd")}
        </span>
        <h4>{dateNote.format("Do")}</h4>
      </div>
    </div>
  );
};
