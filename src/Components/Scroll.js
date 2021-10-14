import React from "react";

const Scroll = (props) => {
  return <div style={scrollStyle}>{props.children}</div>;
};

const scrollStyle = {
  width: "80%",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  border: "1px solid black",
  height: "300px",
  alignItems: "center",
};

export default Scroll;
