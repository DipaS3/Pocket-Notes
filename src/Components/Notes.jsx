import React, { useEffect, useState } from 'react';
import '../App.css';
import '../CSS/Sidebar.css';
import '../CSS/Notes.css';
import Home from './Home';
import { IoSend } from "react-icons/io5";
import { capitalizeInitialLetter } from "../utils/strinutils.js";
import { formatDate  } from "../utils/strinutils.js";

const Notes = ({ note, cards }) => {
  const [subNoteText, setSubNoteText] = useState('');
  const [addedNotes, setAddedNotes] = useState([]);

  if (!note) {
    return <Home />;
  }

  const text = note.notesText;
  const selectedColor = note.selectedColor;

  const handleSend = () => {
    const { datePart, timePart } = formatDate();
    if (subNoteText.trim()) {
      setAddedNotes([{ text: subNoteText, timestamp: [datePart, timePart] }, ...addedNotes]); // Corrected key 'timestap' to 'timestamp'
      setSubNoteText('');
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
    <div className='notesSection'>
      <div className='title'>
        <div className='flex items-center justify-center rounded-circle p-3 gap-4' style={{
          background: selectedColor,
          color: "#fff",
          fontSize: "24px",
          minWidth: "57.9px",
          minHeight: "57.9px",
        }}>
          {capitalizeInitialLetter(note.notesTitle)}
        </div>
        <span
          className="text-gray-700 hover:text-blue-500 text-ellipsis overflow-hidden whitespace-nowrap"
          style={{ fontSize: "24px", maxWidth: "calc(100% - 80px)", padding: "15px" }}
        >
          {note.notesTitle}
        </span>
      </div>

      <div className='notes-area'>
        <div className="subnotes-component">
          <div className="text-content">
            
            {cards && cards.length > 0 ? (
              cards.map((card, index) => (
                <div key={index} className="card-item">
                  <span>{card}</span>
                </div>
              ))
            ) : (
              <p>{" "}</p>
            )}

            {addedNotes.map((subNote, index) => (
              <div key={index} className="added-note">
                <p className="subnote-text" style={{ fontSize: '1.2rem', fontFamily: 'ROBOTO' }}>{subNote.text}</p>
                <p className="subnote-date" style={{ marginLeft: '20px', color: '#353535',fontWeight:500, textAlign: 'right',  display:'block'}}>
                  {subNote.timestamp[0]}  &#9679; {subNote.timestamp[1]} 
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='textarea-note'>
        <textarea
          placeholder='Enter your text here ..'
          value={subNoteText}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        ></textarea>

        <button
          className={`send ${subNoteText.trim() ? 'enabled' : ''}`}
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
