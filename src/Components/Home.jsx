import React from "react";
import "../CSS/Home.css";
import img from "../assets/image-removebg-preview 1.png";
import { IoMdLock } from "react-icons/io";

const NotesContainer = () => {
  return (
    <div className="content">
      <div className="imgcontent">
        <img src={img} />
        <h1>Pocket Notes</h1>
        <p>
          Send and receive messages without keeping your phone online. Use
          Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>

      <div className="footer">
        <span>
          <IoMdLock /> end-to-end encrypted
        </span>
      </div>
    </div>
  );
};

export default NotesContainer;
