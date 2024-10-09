import React, { useEffect, useRef, useState } from "react";
import "../CSS/CreateNotes.css";

const CreateNotes = ({ isModalOpen, addNote, setIsModalOpen }) => {
  const [notesTitle, setNotesTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const modalRef = useRef(null); // Create a ref for the modal

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const addNotes = (e) => {
    setNotesTitle(e.target.value);
  };

  const handleNotesTitle = () => {
    if (!notesTitle.trim()) {
      alert("Please enter a group name");
      return;
    }

    if (!selectedColor) {
      alert("Please choose a color");
      return;
    }

    const newNote = { notesTitle, selectedColor };
    addNote(newNote); // Use the function passed from App.js

    // Clear the input fields
    setNotesTitle("");
    setSelectedColor("");
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    // Check if the click is outside the modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  if (isModalOpen) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#2F2F2FBF",
          position: "absolute",
        }}
      >
        <div className="create-notes" ref={modalRef}>
          <h1>Create New Group</h1>
          <div className="grp-name">
            <h1>Group Name</h1>
            <input
              type="text"
              value={notesTitle}
              onChange={addNotes}
              placeholder="Enter group name"
            />
          </div>

          <div className="select-color">
            <h2>Choose Colour</h2>
            <div className="color">
              {colors.map((item, i) => (
                <div
                  key={i}
                  style={{ background: item }}
                  className={`color-choosen ${
                    selectedColor === item ? "choosen" : ""
                  }`}
                  onClick={() => setSelectedColor(item)}
                ></div>
              ))}
            </div>
          </div>

          <div>
            <button className="create-btn" onClick={handleNotesTitle}>
              Create
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CreateNotes;
