import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Notes from "./Components/Notes";

function App() {
  const [alldata, setAllData] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [cardsNotes, setCardNotes] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("alldata");
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        setAllData(parsedData);
      } else {
        setAllData([]); 
      }
    } catch (error) {
      console.error("Error parsing alldata from localStorage:", error);
      setAllData([]); 
    }
  }
 
  }, []);

  const addNote = (note) => {
    const newNote = {
      id: uuidv4(), // Generate a unique ID
      title: note.notesTitle.slice(0,1).toUpperCase() + note.notesTitle.slice(1),
      color: note.selectedColor,
      notes: [], // Initialize with an empty array for subnotes
    };

    const updatedData = [...alldata, newNote];
    setAllData(updatedData);
    localStorage.setItem("alldata", JSON.stringify(updatedData));
  };

  const updateNote = (updatedNote) => {
    const newData = alldata.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setAllData(newData);
    localStorage.setItem("alldata", JSON.stringify(newData));
  };

  useEffect(() => {
    const storedCardData = localStorage.getItem("cardsNotes");
    if (storedCardData) {
      setCardNotes(JSON.parse(storedCardData));
    }
  }, []);

  const addCard = (cards) => {
    const updatedCards = [...cardsNotes, cards];
    setCardNotes(updatedCards);
    localStorage.setItem("cardsNotes", JSON.stringify(updatedCards));
  };

  const handleNoteSelection = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className="d-flex">
      <Sidebar
        alldata={alldata}
        addNote={addNote}
        onSelectNote={handleNoteSelection}
        selectedNote={selectedNote}
      />
      <Notes note={selectedNote} cards={cardsNotes} updateNote={updateNote} />
    </div>
  );
}

export default App;
