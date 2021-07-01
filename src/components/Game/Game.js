import React from "react";
import "./Game.css";

function Game(props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {props.func1()}
      <div onClick={() => props.func(1)} className="btn"></div>
      <div onClick={() => props.func(2)} className="btn"></div>
      <div onClick={() => props.func(3)} className="btn"></div>
      <div onClick={() => props.func(4)} className="btn"></div>
      <div onClick={() => props.func(5)} className="btn"></div>
      <div onClick={() => props.func(6)} className="btn"></div>
      <div onClick={() => props.func(7)} className="btn"></div>
      <div onClick={() => props.func(8)} className="btn"></div>
      <div onClick={() => props.func(9)} className="btn"></div>
    </div>
  );
}

export default Game;
