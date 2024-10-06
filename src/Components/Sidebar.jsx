import React, { useContext, useState } from "react";
import plus from "../assets/Add.png";
import "../CSS/Sidebar.css";
import CreateNotes from "./CreateNotes";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalChange = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="sidebar">
      <div className="side-heading">
        <p>Pocket Notes</p>
      </div>
      <div className="addtitle"></div>
      <button className="plus-btn" onClick={handleModalChange}>
        <img src={plus} />
      </button>

      <CreateNotes isModalOpen={isModalOpen} />
    </div>
  );
};

export default Sidebar;