import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Notes from "./Components/Notes";

function App() {
  const [alldata, setAllData] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("alldata");
    if (storedData) {
      setAllData(JSON.parse(storedData) || []);
    }
  }, []);

  const addNote = (note) => {
    const newNote = {
      id: uuidv4(),
      title: note.notesTitle.charAt(0).toUpperCase() + note.notesTitle.slice(1),
      color: note.selectedColor,
      notes: [],
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
  const handleNoteSelection = (note) => {
    setSelectedNote(note);
  };

  return (
    <Router>
      <div className="app">
        {isMobile ? (
          <Routes>
            <Route
              path="/"
              element={
                <Sidebar
                  alldata={alldata}
                  addNote={addNote}
                  onSelectNote={handleNoteSelection}
                  selectedNote={selectedNote}
                />
              }
            />
            <Route
              path="/note"
              element={
                <Notes
                  note={selectedNote}
                  updateNote={updateNote}
                  setSelectedNote={setSelectedNote}
                />
              }
            />
          </Routes>
        ) : (
          <div className="grid-container">
            <Sidebar
              alldata={alldata}
              addNote={addNote}
              onSelectNote={handleNoteSelection}
              selectedNote={selectedNote}
            />
            <Notes
              note={selectedNote}
              updateNote={updateNote}
              setSelectedNote={setSelectedNote}
            />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
