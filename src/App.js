import React, { useState } from "react";
import Home from "./Components/Home";
import AddRoom from "./Components/AddRoom";
import Room from "./Components/Room";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

  const addNewRoom = (name, color, type) => {
    setRooms([...rooms, { name, color, type, products: [] }]);
  };

  const selectRoom = (room) => {
    setCurrentRoom(room);
  };

  const addProduct = (product, roomName) => {
    const roomIndex = rooms.findIndex((element) => element.name === roomName);

    if (currentRoom.type !== "Bath" && product === "Boiler") {
      return alert("boiler can be added only to bath");
    }
    if (rooms[roomIndex].products.length >= 5) {
      return alert("can add only 5 products");
    }

    for (let i = 0; i < rooms[roomIndex].products.length; i++) {
      if (
        rooms[roomIndex].products[i].name === "Stereo System" &&
        product === "Stereo System"
      ) {
        return alert("each room can have only 1 stereo system");
      }
    }

    rooms[roomIndex].products.push({ name: product, power: false });
    setRooms([...rooms]);
  };

  const setPower = (productIndex, activationValue, name, roomName) => {
    const roomIndex = rooms.findIndex((element) => element.name === roomName);
    rooms[roomIndex].products[productIndex] = { name, power: activationValue };
    setRooms([...rooms]);
  };

  const removeProducts = (roomName, i) => {
    const roomIndex = rooms.findIndex((element) => element.name === roomName);

    let tempProducts = rooms[roomIndex].products.filter(
      (element, index) => index !== i
    );
    rooms[roomIndex].products = [...tempProducts];

    setRooms([...rooms]);
  };

  return (
    <div className="App">
      <h1 id="headline">Smart House</h1>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              return <Home rooms={rooms} select={selectRoom} />;
            }}
          />
          <Route
            exact
            path="/add-room"
            component={() => {
              return <AddRoom add={addNewRoom} />;
            }}
          />
          <Route
            exact
            path="/room"
            component={() => {
              return (
                <Room
                  roomInfo={currentRoom}
                  addProduct={addProduct}
                  onPowerChange={setPower}
                  del={removeProducts}
                />
              );
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
