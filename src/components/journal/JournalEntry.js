import React from "react";

import moment from "moment";

export const JournalEntry = ({ id, title, body, imageUrl, date }) => {
  const dateNote = moment(date);
  return (
    <div className="journal__entry pointer">
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
