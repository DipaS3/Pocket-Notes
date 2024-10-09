import React, { useState, useEffect } from "react";
import plus from "../assets/Add.png";
import "../CSS/Sidebar.css";
import CreateNotes from "./CreateNotes";
import { capitalizeInitialLetter } from "../utils/strinutils.js";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ alldata, addNote, onSelectNote, selectedNote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check initial width
  const navigate = useNavigate();

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNoteClick = (data) => {
    onSelectNote(data);
    navigate(`/note?id=${data.id}`); // Navigate to note detail on click
  };
  

  return (
    <div
      className="sidebar"
      style={{
        width: isMobile ? "100vw" : "auto", // Full width on mobile
        height: isMobile ? "100vh" : "auto", // Full height on mobile
        position: isMobile ? "fixed" : "relative", // Fixed position on mobile
        top: 0,
        left: 0,
        zIndex: 1000, // Bring to front on mobile
      }}
    >
      <div className="side-heading">
        <p>Pocket Notes</p>
      </div>
      <div className="addtitle">
        {alldata && alldata.length > 0
          ? alldata.map((data, index) => (
              <div
                className="title-heading"
                key={index}
                onClick={() => handleNoteClick(data)}
                style={{
                  backgroundColor:
                    selectedNote?.id === data.id ? "#e0e0e0" : "transparent",
                  borderRadius: "4px",
                  margin: "4px 0",
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
      <button className="plus-btn" onClick={() => setIsModalOpen(true)}>
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
