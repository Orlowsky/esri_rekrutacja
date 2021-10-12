import React, { CSSProperties } from "react";
import Scroll from "./Scroll";

const AdressTable = (props: { adress: any; setNewLocationFunction: any }) => {
  return (
    <div style={adressTableMainDiv}>
      <div style={childDivAdressTable}>
        <p style={{ width: "38%", ...paragraphTitle }}>Ulica</p>
        <p style={{ width: "30%", ...paragraphTitle }}>Numer</p>
        <p style={{ width: "30%", ...paragraphTitle }}>Przybliż</p>
      </div>
      <Scroll>
        {props.adress.map((el: any, index: any) => {
          return (
            <div
              key={index}
              style={{ display: "flex", width: "98%", margin: "1%" }}
            >
              <p style={{ width: "40%", textAlign: "left" }}>
                {el.attributes.ulica}
              </p>
              <p style={{ width: "30%", textAlign: "left" }}>
                {el.attributes.numerPorza}
              </p>
              <p
                onClick={() => {
                  props.setNewLocationFunction({
                    lat: el.geometry.y,
                    lng: el.geometry.x,
                  });
                }}
                style={linkStyle}
              >
                Przybliż
              </p>
            </div>
          );
        })}
      </Scroll>
    </div>
  );
};
let linkStyle: CSSProperties = {
  width: "30%",
  textAlign: "left",
  cursor: "pointer",
  color: "blue",
};

let paragraphTitle: CSSProperties = {
  textAlign: "left",
  fontWeight: 600,
};
let adressTableMainDiv: CSSProperties = {
  width: "98%",
  margin: "1%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
};
let childDivAdressTable: CSSProperties = {
  display: "flex",
  width: "78%",
  padding: "1%",
  border: "black 1px solid",
  borderBottom: "0",
};

export default AdressTable;
