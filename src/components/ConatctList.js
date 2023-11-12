import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = ({
  contacts,
  deleteContactHandler,
  term,
  searchKeyword,
}) => {
  const inputE1 = useRef("");
  const renderContactList = () => {
    return contacts.map((contact) => (
      <ContactCard
        key={contact.id}
        contact={contact}
        deleteContactHandler={deleteContactHandler}
      />
    ));
  };
  const getSearchTerm = () => {
    searchKeyword(inputE1.current.value);
  };
  return (
    <div className="main">
      <h2 className="header">Contact List</h2>
      <Link to="/add">
        <button
          className="ui button red right"
          style={{ marginBottom: "10px" }}
        >
          Add Contact
        </button>
      </Link>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputE1}
            type="text"
            placeholder="search contacts"
            className="props"
            value={term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactList()}</div>
    </div>
  );
};

export default ContactList;
