import React, { useState } from "react";
import plus from "../assets/Add.png";
import "../CSS/Sidebar.css";
import CreateNotes from "./CreateNotes";
import { capitalizeInitialLetter } from "../utils/strinutils.js"

const Sidebar = ({ alldata, addNote ,onSelectNote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[showPanel,setShowPanel]=useState(false);

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
              <div className="title-heading" key={index} onClick={() => onSelectNote(data)}>
                <div className="capital" style={{backgroundColor:data.selectedColor}}>
                  {" "}
                  {capitalizeInitialLetter(data.notesTitle)}
                </div>
                <div className="heading">{data.notesTitle}</div>
              </div>
            ))
          : " "}
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
