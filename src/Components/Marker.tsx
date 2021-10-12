import React from "react";
import "../styles/marker.css";
const Marker = (props: any) => {
  return (
    <div
      className="marker"
      onClick={() => {
        props.setNewLocationFunction({ lat: props.lat, lng: props.lng });
      }}
      style={{ backgroundColor: "red", cursor: "pointer" }}
    ></div>
  );
};

export default Marker;
