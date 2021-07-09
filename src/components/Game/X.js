import React from "react";

const beforeStyle = {
  background: "#19fe62",
  width: "93%",
  height: "13%",
  position: "absolute",
  transform: "rotate(45deg)",
  top: "70px",
  left: "8px",
};
const afterStyle = {
  background: "#19fe62",
  width: "93%",
  height: "13%",
  position: "absolute",
  transform: "rotate(-45deg)",
  top: "70px",
  left: "8px",
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
