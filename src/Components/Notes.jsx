import React, { useEffect, useState } from "react";
import "../App.css";
import "../CSS/Notes.css";
import { IoSend } from "react-icons/io5";
import { capitalizeInitialLetter } from "../utils/strinutils.js";
import { formatDate } from "../utils/strinutils.js";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

const Notes = ({ note, cards, updateNote, setSelectedNote }) => {
  const { noteId } = useParams();
  const [subNoteText, setSubNoteText] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [addedNotes, setAddedNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(note);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile && noteId) {
      const storedData = localStorage.getItem("alldata");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          const foundNote = parsedData.find((n) => n.id === noteId);
          if (foundNote) {
            setCurrentNote(foundNote);
            setAddedNotes(foundNote.notes || []);
          } else {
            // If no note is found, navigate back to the home page
            navigate("/");
          }
        } catch (error) {
          console.error("Error parsing alldata from localStorage:", error);
        }
      }
    } else if (note) {
      setCurrentNote(note);
      setAddedNotes(note.notes || []);
    }
  }, [isMobile, noteId, note, navigate]);

  // Guard clause for currentNote
  if (!currentNote) {
    return <div>Loading...</div>; // Or a placeholder if currentNote is null
  }

  const { title, color } = currentNote;

  const handleSend = () => {
    const { datePart, timePart } = formatDate();
    if (subNoteText.trim()) {
      const newSubNote = {
        id: uuidv4(),
        text: subNoteText,
        timestamp: [datePart, timePart],
      };

      const updatedNotes = [...addedNotes, newSubNote];
      setAddedNotes(updatedNotes);
      setSubNoteText("");

      updateNote({ ...currentNote, notes: updatedNotes });
    }
  };

  const handleChange = (e) => {
    setSubNoteText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="notesSection">
      <div className="title">
        <button onClick={() => setSelectedNote(null)} className="back-button">
          ←
        </button>
        <div
          className="flex items-center justify-center rounded-circle p-3 gap-4"
          style={{
            background: color,
            color: "#fff",
            fontSize: "24px",
            minWidth: "57.9px",
            minHeight: "57.9px",
          }}
        >
          {capitalizeInitialLetter(title)}
        </div>
        <span
          className="text-gray-700 hover:text-blue-500 text-ellipsis overflow-hidden whitespace-nowrap"
          style={{
            fontSize: "24px",
            maxWidth: "calc(100% - 80px)",
            padding: "15px",
          }}
        >
          {title}
        </span>
      </div>

      <div className="notes-area">
        {cards && cards.length > 0 && addedNotes.length === 0 ? (
          <p>No cards available.</p>
        ) : (
          <>
            {cards &&
              cards.length > 0 &&
              cards.map((card, index) => (
                <div key={index} className="subnotes-component">
                  <div className="text-content">
                    <div className="card-item">
                      <span>{card}</span>
                    </div>
                  </div>
                </div>
              ))}
            {addedNotes.length > 0 &&
              addedNotes.map((subNote) => (
                <div key={subNote.id} className="added-note">
                  <p
                    className="subnote-text"
                    style={{ fontSize: "1.2rem", fontFamily: "ROBOTO" }}
                  >
                    {subNote.text}
                  </p>
                  <p
                    className="subnote-date"
                    style={{
                      marginLeft: "20px",
                      color: "#353535",
                      fontWeight: 500,
                      textAlign: "right",
                      display: "block",
                    }}
                  >
                    {subNote.timestamp[0]} &#9679; {subNote.timestamp[1]}
                  </p>
                </div>
              ))}
          </>
        )}
      </div>

      <div className="textarea-note">
        <textarea
          placeholder="Enter your text here .."
          value={subNoteText}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        ></textarea>

        <button
          className={`send ${subNoteText.trim() ? "enabled" : ""}`}
          onClick={handleSend}
          disabled={!subNoteText.trim()}
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default Notes;
