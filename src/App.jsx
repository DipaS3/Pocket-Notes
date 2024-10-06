import { useState } from "react";

import "./App.css";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Home";
import Notes from "./Components/Notes";
import CreateNotes from "./Components/CreateNotes";

function App() {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <Home />
        <CreateNotes />
      </div>
    </>
  );
}

export default App;