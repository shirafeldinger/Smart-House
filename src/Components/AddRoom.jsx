import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function AddRoom(props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("Kitchen");

  return (
    <div id="add-room">
      <h2>Add a room to the app</h2>
      <select
        onChange={(e) => {
          setType(e.target.value);
        }}
      >
        <option value="Kitchen">Kitchen</option>
        <option value="Bath">Bath</option>
        <option value="Sleeping room">Sleeping room</option>
      </select>
      <input
        type="text"
        placeholder="Room's name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room's button color "
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />

      <Link
        className="btn btn-primary"
        to="/"
        onClick={(e) => {
          if (name === "") {
            document.getElementById("p-add-room").innerHTML =
              "You must give the room a name";
            e.preventDefault();
          } else {
            props.add(name, color, type);
          }
        }}
      >
        Create
      </Link>
      <p id="p-add-room"></p>
    </div>
  );
}
