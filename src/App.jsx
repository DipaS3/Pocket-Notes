import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Notes from "./Components/Notes";

function App() {
  const [alldata, setAllData] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [cardsNotes, serCardNotes] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const storedData = localStorage.getItem("alldata");
    if (storedData) {
      setAllData(JSON.parse(storedData));
    }
  }, []);

  const addNote = (note) => {
    const updatedData = [...alldata, note];
    setAllData(updatedData);
    localStorage.setItem("alldata", JSON.stringify(updatedData));
  };

  useEffect(() => {
    const storeCardData = localStorage.getItem("cardsNotes");
    if (storeCardData) {
      serCardNotes(JSON.parse(storeCardData)); // Update the correct state
    }
  }, []);

  const addCard = (cards) => {
    const updatedCards = [...cardsNotes, cards]; // Ensure cardsNotes is an array
    serCardNotes(updatedCards);
    localStorage.setItem("cardsNotes", JSON.stringify(updatedCards));
  };

  const handleNoteSelection = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className="d-flex">
      <Sidebar alldata={alldata} addNote={addNote} onSelectNote={handleNoteSelection} />
      <Notes note={selectedNote} cards={cardsNotes} /> {/* Pass cardsNotes */}
    </div>
  );
}

export default App;
