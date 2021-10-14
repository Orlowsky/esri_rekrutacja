import React, { useState, useEffect,useRef } from "react";
import FormAdress from "./Components/FormAdress";
import AdressTable from "./Components/AdressTable";
import "./App.css";
import GoogleMapReact from "google-map-react";
import Marker from "./Components/Marker";
import ResultCount from "./Components/ResultCount";
require('dotenv').config()

function App(props: any) {
  const refContainer = useRef<any>(null);
  const [url, setUrl] = useState("");
  const [adress, setAdress] = useState<any | null>([]);
  const [location, setLocation] = useState<any | null>({
    lat: 51.079,
    lng: 21.025,
  });
 const [newValueIndex, setNewValueIndex] = useState<string | null>(null)
  const [zoom, setZoom] = useState<any | null>(13);
  const mapState = { location: location };
  useEffect(() => {
    const headers = {
      /* 'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*", */
    };

    if (url !== "") {
      fetch(url, { headers })
        .then((response) => response.json())
        .then((data) => {
          setAdress(data.features);
        });
    }
  }, [url]);

  const setDataUrl = (urlQueryData: string): void => {
    const partUrl1: string =
    `${process.env.REACT_APP_URL}query?where=`;
    const partUrl3: string =
      `${process.env.REACT_APP_WHOLE_QUERY}`
    const fullUrl: string = partUrl1 + urlQueryData + partUrl3;
    setUrl(fullUrl);
  };

  const clearDataUrl = (): void => {
    setUrl("");
    setAdress([]);
    setLocation({
      lat: 51.079,
      lng: 21.025,
    });
    setZoom(13);
  };
  const setNewLocationFunction = (newLocation: any) => {
    setLocation(newLocation);
    if(zoom!==18){
      setTimeout(function () {
        setZoom(18);
      }, 1);
      setZoom(13);
    }
    
    
  };
 let handleZoomChanged = ()=>{
    setZoom(refContainer.current.map_.zoom)
  }

  const resultCountFunction = () => {
    return adress.length;
  };

  const setNewValueIndexFunction = (newIndex:string) =>{
    setNewValueIndex(newIndex)
  }

  const resetsetNewValueIndex = () =>{
    setNewValueIndex(null)
  }

 
  
  return (
    <div className="App">
      <p style={{ textAlign: "left", width: "80%" }}>Search Street</p>
      <FormAdress setDataUrl={setDataUrl} clearDataUrl={clearDataUrl} />
      <p style={{ textAlign: "left", width: "80%" }}>
        Wyniki:
        <ResultCount resultCountFunction={resultCountFunction} />
      </p>

      {adress.length !== 0 ? (
        <AdressTable
        setNewValueIndexFunction ={setNewValueIndexFunction}
          adress={adress}
          setNewLocationFunction={setNewLocationFunction}
        />
      ) : (
        "Brak danych do wyświetlenia. Wpisz dane w Formularz"
      )}

      <div style={{ height: "400px", width: "80%" }}>
        <GoogleMapReact
          ref={refContainer}
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY!}}
          defaultCenter={{
            lat: 51.079,
            lng: 21.025,
          }}
          defaultZoom={13}
          center={mapState.location}
          zoom={zoom}
         onZoomAnimationEnd={handleZoomChanged}
        >
          {adress.length !== 0
            ? adress.map((el: any, index: any) => {
                return (
                  <Marker
                    keycheck={"key" + index}
                    key={"key" + index}
                    newValueIndex={newValueIndex}
                    index={"markernumber-"+index}
                    location = {location}
                    lat={el.geometry.y}
                    lng={el.geometry.x}
                    setNewLocationFunction={setNewLocationFunction}
                    resetsetNewValueIndex={resetsetNewValueIndex}
                  />
                );
              })
            : ""}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;
