import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home(props) {
  return (
    <div>
      <h4>You can add a room you want to control by clicking the button</h4>
      <div id="rooms-list">
        {props.rooms.map((element, i) => {
          return (
            <Link
              to="/room"
              className="room-name"
              key={i}
              onClick={() => {
                props.select(element, i);
              }}
              style={{ background: element.color }}
            >
              {element.name}
            </Link>
          );
        })}
      </div>{" "}
      <a href="#" className="arrow down">
        Down
      </a>
      <Link className="btn btn-primary" to="/add-room">
        Add room
      </Link>
    </div>
  );
}
