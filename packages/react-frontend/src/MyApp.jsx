// src/MyApp.jsx
import Table from "./Table";
import React from "react";

const characters = [
  {
    name: "Charlie",
    job: "Janitor",
  },
  {
    name: "Mac",
    job: "Bouncer",
  },
  {
    name: "Dee",
    job: "Aspring actress",
  },
  {
    name: "Dennis",
    job: "Bartender",
  },
];

function MyApp() {
  return (
    <div className="container">
      <Table characterData={characters}/>
    </div>
  );
}