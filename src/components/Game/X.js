import React from "react";

const beforeStyle = {
  background: "white",
  width: "93%",
  height: "13%",
  position: "absolute",
  transform: "rotate(45deg)",
  top: "42px",
  left: "4px",
};
const afterStyle = {
  background: "white",
  width: "93%",
  height: "13%",
  position: "absolute",
  transform: "rotate(-45deg)",
  top: "42px",
  left: "4px",
};

const X = () => {
  return (
    <>
      <div className="before" style={beforeStyle}></div>
      <div className="after" style={afterStyle}></div>
    </>
  );
};

export default X;
