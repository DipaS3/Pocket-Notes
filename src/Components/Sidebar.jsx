import React, { useState } from "react";
import plus from "../assets/Add.png";
import "../CSS/Sidebar.css";
import CreateNotes from "./CreateNotes";
import { capitalizeInitialLetter } from "../utils/strinutils.js";

const Sidebar = ({ alldata, addNote, onSelectNote, selectedNote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalChange = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="sidebar">
      <div className="side-heading">
        <p>Pocket Notes</p>
      </div>
      <div className="addtitle">
        {alldata && alldata.length > 0
          ? alldata.map((data, index) => (
              <div
                className="title-heading"
                key={index}
                onClick={() => onSelectNote(data)}
                style={{
                  backgroundColor:
                    selectedNote?.id === data.id ? "#e0e0e0" : "transparent", // Change this to your preferred color
                  borderRadius: "4px", // Optional: Add some rounding for aesthetics
                  margin: "5px 0", // Optional: Add some spacing between items
                }}
              >
                <div
                  className="capital"
                  style={{ backgroundColor: data.color }}
                >
                  {capitalizeInitialLetter(data.title)}
                </div>
                <div className="heading">{data.title}</div>
              </div>
            ))
          : "No notes available."}
      </div>
      <button className="plus-btn" onClick={handleModalChange}>
        <img src={plus} alt="Add" />
      </button>

      <CreateNotes
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        addNote={addNote}
      />
    </div>
  );
};

export default Sidebar;
