import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Form from "react-bootstrap/Form";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";

function AreaScreen() {
  const googleMapsApiKey = "AIzaSyBO9ngwlK0mOR2jLp4kJk-2FxRC7ncM0oo";
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState("10:00");
  const [value2, onChange2] = useState("10:00");
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 40.748817,
    lng: -73.985428,
  };

  return (
    <div className="mojenieruszac" style={{ display: "flex", flexDirection: "column" }}>
      <div className="d-flex flex-row bd-highlight" style={{ justifyContent: "space-between" }}>
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <div style={{ backgroundColor: "white", height: "100vh", width: "30%" }}>
            <Form.Control
              type="text"
              placeholder="Nazwa obszaru"
              name="area_name"
              className="input"
              style={{ width: "60%", borderRadius: "20vh", marginTop: "20%" }}
            />
            <div style={{ display: "flex", flexDirection: "column", margin: 10 }}>
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
              <TimePicker
                onChange={onChange2}
                value={value2}
                className="input"
                style={{ width: "60%", borderRadius: "20vh", marginTop: "20%", justifyContent: "center", margin: 10 }}
              />
              <Dropdown className="input">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  style={{ backgroundColor: "deepskyblue", borderRadius: "20px" }}>
                  Dropdown List
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="input"
                style={{ display: "flex", justifyContent: "center", width: "60%" }}
              />

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
                className="button1"
                style={{ width: "60%", display: "flex", justifyContent: "center", marginLeft: "22%" }}>
                Zatwierdź
              </button>
            </div>
          </div>

          <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter} />
        </LoadScript>
      </div>
    </div>
  );
}

export default AreaScreen;
