import React, { useState, useEffect } from "react";
import FormAdress from "./Components/FormAdress";
import AdressTable from "./Components/AdressTable";
import "./App.css";
import GoogleMapReact from "google-map-react";
import Marker from "./Components/Marker";
import ResultCount from "./Components/ResultCount";

function App(props: any) {
  const [url, setUrl] = useState("");
  const [adress, setAdress] = useState<any | null>([]);
  const [location, setLocation] = useState<any | null>({
    lat: 51.079,
    lng: 21.025,
  });
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
      "https://services5.arcgis.com/UoRAQmXv3KtNImPl/ArcGIS/rest/services/adresss/FeatureServer/0/query?where=";
    const partUrl3: string =
      "&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=ulica%2CnumerPorza&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=none&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";
    const fullUrl: string = partUrl1 + urlQueryData + partUrl3;
    setUrl(fullUrl);
  };

  const clearDataUrl = (): void => {
    setUrl("");
    setAdress([]);
  };
  const setNewLocationFunction = (newLocation: any) => {
    setLocation(newLocation);
    setTimeout(function () {
      setZoom(18);
    }, 1);
    setZoom(13);
  };

  const resultCountFunction = () => {
    return adress.length;
  };

  
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
          adress={adress}
          setNewLocationFunction={setNewLocationFunction}
        />
      ) : (
        "Brak danych do wyświetlenia. Wpisz dane w Formularz"
      )}

      <div style={{ height: "400px", width: "80%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA5Vx5pgZUDZJWJZB5HmX9zvIIDTQa04ns" }}
          defaultCenter={location}
          defaultZoom={zoom}
          center={mapState.location}
          zoom={zoom}
        >
          {adress.length !== 0
            ? adress.map((el: any, index: any) => {
                return (
                  <Marker
                    key={"key" + index}
                    lat={el.geometry.y}
                    lng={el.geometry.x}
                    setNewLocationFunction={setNewLocationFunction}
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
