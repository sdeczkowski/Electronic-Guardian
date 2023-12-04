import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Button, Nav } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import { FaMap, FaRegCircleUser, FaLocationDot, FaMessage } from "react-icons/fa6";

function AreaScreen() {
  const googleMapsApiKey = "AIzaSyBO9ngwlK0mOR2jLp4kJk-2FxRC7ncM0oo";
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState("10:00");
  const [value2, onChange2] = useState("10:00");
  const [location, setLocation] = useState();
  const [coordinates, setCoordinates] = useState([]);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null); // Dodaj nowy stan
  const [mapRegionComplete, setRegionComplete] = useState([]);
  const [areaname, setAreaName] = useState("");
  const [pods, setPods] = useState([]);

  const checkForIntersections = (newCoordinate) => {
    if (coordinates.length < 3) return false;

    for (let i = 0; i < coordinates.length; i++) {
      const point1 = coordinates[i];
      const point2 = coordinates[(i + 1) % coordinates.length];
      const nextPoint = coordinates[(i + 2) % coordinates.length];

      if (
        linesIntersect(
          newCoordinate.latitude,
          newCoordinate.longitude,
          nextPoint.latitude,
          nextPoint.longitude,
          point1.latitude,
          point1.longitude,
          point2.latitude,
          point2.longitude
        )
      ) {
        return true;
      }
    }
    return false;
  };

  const linesIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    const a = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const b = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
    const c = (x2 - x3) * (y1 - y3) - (y2 - y3) * (x1 - x3);
    const d = (x2 - x4) * (y1 - y3) - (y2 - y4) * (x1 - x3);

    return a * b < 0 && c * d < 0;
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    const hasIntersections = checkForIntersections(coordinate);

    //if (!hasIntersections) {
    setCoordinates((prevCoordinates) => [...prevCoordinates, coordinate]);
    //} else {
    //  console.log("Przecięcie! Wyczyszczam obszar.");
    //  resetCoordinates();
    //}
    if (
      selectedCoordinate &&
      selectedCoordinate.latitude === coordinate.latitude &&
      selectedCoordinate.longitude === coordinate.longitude
    ) {
      setCoordinates((prevCoordinates) =>
        prevCoordinates.filter(
          (coord) => coord.latitude !== coordinate.latitude || coord.longitude !== coordinate.longitude
        )
      );
      setSelectedCoordinate(null);
    } else {
      setSelectedCoordinate(coordinate);
    }
  };

  const resetCoordinates = () => {
    setCoordinates([]);
  };

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 51.237953,
    lng: 22.529214,
  };

  return (
    <div className="d-flex flex-row bd-highlight" style={{overflow: "hidden"}}>
        <div
          style={{
            backgroundColor: "white",
            height: "100vh",
            width: "30%",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            alignItems: "center"
          }}>
          <div
            style={{ display: "flex", justifyContent: "center", color: "black", fontSize: "50px", fontWeight: "bold" }}>
            Nowy obszar
          </div>
          <br />
          <Form.Control
            type="text"
            placeholder="Nazwa obszaru"
            name="area_name"
            className="input form-control"
            value={areaname}
            onChangeText={(text) => setAreaName(text)}
            style={{ width: "70%", borderRadius: "20vh" }}
          />
          <br />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TimePicker
              onChange={onChange}
              value={value}
              className="input"
              style={{
                width: "60%",
                borderRadius: "20vh",
                marginTop: "20%",
                display: "flex",
                justifyContent: "center",
                margin: 10,
              }}
            />
            <br />
            <TimePicker
              onChange={onChange2}
              value={value2}
              className="input "
              style={{ width: "60%", borderRadius: "20vh", marginTop: "20%", justifyContent: "center", margin: 10 }}
            />
            <br />
            <Dropdown className="input">
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="button"
                style={{ backgroundColor: "deepskyblue", borderRadius: "20px", borderWidth: 0}}>
                Dropdown List
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <br />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="react-time-picker__wrapper"
              style={{ display: "flex", justifyContent: "center", borderRadius: "20px" }}
            />
            <br />
            {/* Checkboxes */}
            <div style={{ display: "flex", flexDirection: "column", margin: "2%", justifyContent: "center" }}>
              <label>
                <input type="checkbox" className="checkbox-round" />
                Codziennie
              </label>
              <label>
                <input type="checkbox" className="checkbox-round" />
                Co tydzień
              </label>
              <label>
                <input type="checkbox" className="checkbox-round" />
                Nigdy
              </label>
            </div>

            {/* Button */}
            <button
              className="button" style={{ backgroundColor: "deepskyblue" }}>
              Zatwierdź
            </button>
          </div>
        </div>
        <LoadScript googleMapsApiKey={googleMapsApiKey}>      
        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter} options={{
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: false,
              }}/>
      </LoadScript>
    </div>
  );
}

export default AreaScreen;
