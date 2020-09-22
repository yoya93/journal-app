import React from "react";

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515355_10484.jpg)",
        }}
      ></div>
      <div className="journal-entry-body">
        <p className="journal-entry-title">un nuevo dia</p>
        <p className="journal-entry-content">
          Lorendslkfmksdmfsdmfsmdfmsdñfmsd
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span className="journal__entry-date-box-span">Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
