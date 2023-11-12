import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import uuid from "react-uuid";

import api from "../api/contacts";
import "./App.css";
import { Header } from "./Header";
import AddContact from "./AddContact";
import ConatctList from "./ConatctList";
import ContactDetails from "./ContactDetails";
import EditContact from "./EditContact";

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const addContactHandler = async (contact) => {
    console.log("ADD");
    const addedContact = await api.post("contacts", {
      ...contact,
      id: uuid(),
    });
    setContacts([...contacts, { ...addedContact.data }]);
  };

  const fetchContacts = async () => {
    console.log("GET");
    const response = await api.get("/contacts");
    return response.data;
  };

  const deleteContactHandler = async (uuid) => {
    console.log("DELETE");
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (shouldDelete) {
      console.log("Deleted");
      await api.delete(`/contacts/${uuid}`);
    } else {
      console.log("Deletion canceled.");
    }
    const allContacts = await fetchContacts();
    if (allContacts) setContacts(allContacts);
  };

  const editContactHandler = async (contact) => {
    console.log("EDIT");
    console.log(contact);
    await api.patch(`/contacts/${contact.id}`, contact);
    const allContacts = await fetchContacts();
    if (allContacts) setContacts(allContacts);
  };

  const searchHandler = async (searchTerm) => {
    console.log("searchTerm", searchTerm);
    setSearchTerm(searchTerm);
    console.log(contacts);
    if (searchTerm !== "") {
      const newContacts = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContacts);
    } else {
      setSearchResult(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await fetchContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  return (
    <div className="ui container">
      <Header />
      <Router>
        <Routes>
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route
            path="/"
            element={
              <ConatctList
                contacts={searchTerm.length <= 0 ? contacts : searchResult}
                deleteContactHandler={deleteContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/edit"
            element={<EditContact editContactHandler={editContactHandler} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
