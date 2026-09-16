// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    // const updated = characters.filter((character, i) => {
    //   return i !== index;
    // });
    const updated = fetch("Http://localhost:8000/users/:id", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(index),
    });

    setCharacters(updated);
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  // added await
  async function postUser(person) {
    const promise = await fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    if (promise.status !== 201) {
      throw new Error(`User was not created (status ${promise.status})`);
    }

    return promise.json();
  }

  function updateList(person) {
    postUser(person)
    .then(() => setCharacters([...characters, person]))
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
  <div className="container">
    <Table characterData={characters} removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />
  </div>
);
}

export default MyApp;