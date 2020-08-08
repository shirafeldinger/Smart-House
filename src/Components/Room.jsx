import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Room.css";

export default function Room(props) {
  const [flag, setFlag] = useState(false);
  const [product, setProduct] = useState("");

  const show = () => {
    if (flag) {
      return (
        <div id="add-product">
          <select
            onChange={(e) => {
              setProduct(e.target.value);
            }}
          >
            <option value="">select a product...</option>
            <option value="Air-Conditioner">Air Conditioner</option>
            <option value="Lamp">Lamp</option>
            <option value="Stereo System">Stereo system</option>
            <option value="Boiler">Boiler</option>
          </select>
          <button
            className="btn btn-primary"
            id="add"
            onClick={() => {
              setFlag(false);
              props.addProduct(product, props.roomInfo.name);
            }}
          >
            Add
          </button>
        </div>
      );
    }
  };

  const { type } = props.roomInfo;
  let image;

  switch (type) {
    case "Kitchen":
      image = process.env.PUBLIC_URL + "/kitchen.jpg";
      break;
    case "Bath":
      image = process.env.PUBLIC_URL + "/bath.jpg";
      break;
    case "Sleeping room":
      image = process.env.PUBLIC_URL + "/sleeping.jpg";
      break;
    default:
      image = "none";
  }

  return (
    <div id="room">
      <div id="room-detalis">
        <p>Room name : {props.roomInfo.name}</p>
        <p>Room type : {props.roomInfo.type}</p>
      </div>{" "}
      <img id="img" src={image} />
      <div>
        {" "}
        <div className="alert alert-info" id="explanation">
          By clicking add product you select which products you want to control
          in your room!
        </div>{" "}
        <div className="alert alert-secondary" id="exp2">
          Click on the product to turn it off or on!
        </div>
      </div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setFlag(true);
          }}
        >
          Add product
        </button>
        <Link className="btn btn-outline-primary" to="/">
          Back Home
        </Link>
      </div>
      <div id="buttons-list">
        {" "}
        {props.roomInfo.products.map((element, i) => {
          return (
            <div key={i}>
              {" "}
              <button
                id="product-button"
                className={
                  element.power ? "btn btn-success " : "btn btn-danger "
                }
                onClick={() => {
                  props.onPowerChange(
                    i,
                    !element.power,
                    element.name,
                    props.roomInfo.name
                  );
                }}
              >
                {element.name}
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  props.del(props.roomInfo.name, i);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      {show()}
    </div>
  );
}
