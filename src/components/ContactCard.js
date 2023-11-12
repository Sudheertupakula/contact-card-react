import React from "react";
import { Link } from "react-router-dom";

import image from "../images/user.png";

const ContactCard = ({ contact, deleteContactHandler }) => {
  return (
    <div className="item">
      <img className="ui avatar image" src={image} alt="user" />
      <div className="content">
        <Link to={`contact/${contact.id}`} state={contact}>
          <div className="header">{contact.name}</div>
          <div>{contact.email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{
          color: "red",
          marginBottom: "100",
          cursor: "pointer",
          marginLeft: "10px",
        }}
        onClick={() => deleteContactHandler(contact.id)}
      ></i>
      <Link to={`edit`} state={contact}>
        <i
          className="edit alternate outline icon"
          style={{ color: "red", marginBottom: "100", cursor: "pointer" }}
        ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
