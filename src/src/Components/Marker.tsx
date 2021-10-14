import React, { useState, useRef} from "react";
import "../styles/marker.css";
const Marker = (props: any) => {
  const [changeColor,setChangeColor] = useState<boolean>(false)
  const refMarker = useRef<any>(null)
 
  let  btn_color_change = changeColor ? 'animation-marker' : ''
  if(props.keycheck === props.newValueIndex){
    btn_color_change = 'animation-marker'
  }
  
  return (
    <div
    ref={refMarker}
      className={`marker ${btn_color_change}`}
      onClick={() => {
        setChangeColor(true)
        props.setNewLocationFunction({ lat: props.lat, lng: props.lng });
      }}
      onAnimationEnd={() =>  {
        props.resetsetNewValueIndex()
        setChangeColor(false)}}
      
    ></div>
  );
};

export default Marker;
