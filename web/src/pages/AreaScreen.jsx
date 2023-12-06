
import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Polygon, useJsApiLoader } from "@react-google-maps/api";
import { Button, Nav, ButtonGroup, DropdownButton } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import { FaMap, FaRegCircleUser, FaLocationDot, FaMessage } from "react-icons/fa6";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";

function AreaScreen() {
  const mapRef = React.useRef(null);

  const [startDate, setStartDate] = useState(new Date());
  const [timeFrom, setTime] = useState("10:00");
  const [timeTo, setTime2] = useState("10:00");
  const [location, setLocation] = useState();
  const [selectedName, setSelectedName] = useState("Wybierz podopiecznego!");
  const [selectedValue, setSelectedValue] = useState("Wybierz podopiecznego!");
  const [coordinates, setCoordinates] = useState([]);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null); // Dodaj nowy stan
  const [mapRegionComplete, setRegionComplete] = useState([]);
  const [areaname, setAreaName] = useState("");
  const [pods, setPods] = useState([]);
  const [errDate, setErrDate] = useState(false);
  const [errTime, setErrTime] = useState(false);
  const [errTime2, setErrTime2] = useState(false);
  const [check, setCheck] = useState(null);
  const [checkBox, setCheckBox] = useState(null);
  const [errName, setErrName] = useState(false);
  const [checkArea, setCheckArea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState(null);
  const [checked, setChecked] = React.useState(false);
  const [errPicker, setErrPicker] = useState(false);
  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);
  const [checkedThree, setCheckedThree] = React.useState(false);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const handleChangeOne = () => {
    setCheckedOne(true);
    setCheckedTwo(false);
    setCheckedThree(false);
  };

  const handleChangeTwo = () => {
    setCheckedOne(false);
    setCheckedTwo(true);
    setCheckedThree(false);
  };

  const handleChangeThree = () => {
    setCheckedOne(false);
    setCheckedTwo(false);
    setCheckedThree(true);
  };

const checkForIntersections = (newCoordinate) => {
    if (coordinates.length < 3) return false;
  
    for (let i = 0; i < coordinates.length - 2; i++) {
      const line1Start = coordinates[i];
      const line1End = coordinates[i + 1];
  
      for (let j = i + 2; j < coordinates.length; j++) {
        const line2Start = coordinates[j];
        const line2End = coordinates[(j + 1) % coordinates.length];
  
        if (
          linesIntersect(
            line1Start.latitude,
            line1Start.longitude,
            line1End.latitude,
            line1End.longitude,
            line2Start.latitude,
            line2Start.longitude,
            line2End.latitude,
            line2End.longitude
          )
        ) {
          console.log('Intersection detected at lines', i, j);
          return true;
        }
      }
    }
  
    return false;
  };
  

  const linesIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    const a = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const b = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
    const c = (x2 - x3) * (y1 - y3) - (y2 - y3) * (x1 - x3);
    const d = (x2 - x4) * (y1 - y3) - (y2 - y4) * (x1 - x3);

    console.log('a:', a, 'b:', b, 'c:', c, 'd:', d);

    const isIntersecting = a * b < 0 && c * d < 0;

  console.log('Is Intersecting:', isIntersecting);

  return isIntersecting;
  };

  const opcje = [
    { id: 1, label: "Codziennie" },
    { id: 2, label: "Co tydzień" },
    { id: 3, label: "Nigdy" },
  ];

  const handleSelect = (e) => {
    setSelectedValue(e);
  };

  const onSubmit = async () => {
    setErrTime(false);
    setErrDate(false);
    setCheck(null);
    setErrName(false);
    setErrPicker(false);
    setCheck("");
    
    const [hourF, minutesF] = timeFrom.split(":");
    const [hourT, minutesT] = timeTo.split(":");

    let dayFrom = new Date();
    let dayTo = new Date();

    dayFrom.setHours(hourF);
    dayFrom.setMinutes(minutesF);
    dayTo.setHours(hourT);
    dayTo.setMinutes(minutesT);

    if (!areaname.trim()) {
      setErrName(true);
      setCheck("Podaj nazwę obszaru!");
    } else if (!startDate) {
      setErrDate(true);
      setCheck("Wybierz datę!");
    } else if (!dayFrom) {
      setErrTime(true);
      setCheck("Wybierz czas rozpoczęcia!");
    } else if (!dayTo) {
      setErrTime2(true);
      setCheck("Wybierz czas zakończenia!");
    } else if (dayFrom >= dayTo) {
      setErrTime2(true);
      setCheck("Czas zakończenia musi być późniejszy od czasu rozpoczęcia!");
    } else if (selectedValue === "Wybierz podopiecznego!") {
      setErrPicker(true);
      setCheck("Wybierz podopiecznego!");
    } else if (checkBox === null) {
      setCheck("Wybierz cykliczność!");
    } else if (coordinates.length === 0) {
      setCheck("Nie wybrano obszaru!");
    } else {
      const id = localStorage.getItem("_id");
      try {
        console.log("xdd")
        const url = "http://localhost:3001/api/area/add";
        await axios.post(url, {
          _opid: id,
          _podid: selectedValue,
          name: areaname,
          cords: coordinates,
          initialRegion: {
            latitude: 51.2334710481964,
            latitudeDelta: 0.050928177383966045,
            longitude: 22.555865552276373,
            longitudeDelta: 0.042099617421627045,
            },
          date: startDate.toString(),
          repeat: checkBox,
          time_f: dayFrom.toString(),
          time_t: dayTo.toString(),
          isActive: false,
        });
      } catch (error) {
        console.error("Błąd podczas zapisywania danych:", error);
      }
      window.location.replace("/list")
    }
  };

  const Setup = async () => {
    const region = localStorage.getItem("location");
    setLocation(JSON.parse(region));
    setRegionComplete(JSON.parse(region));
    const id = localStorage.getItem("_id");
    try {
      const url = "http://localhost:3001/api/user/getpods/" + id;
      axios.get(url).then((response) => {
        if (response && response.data) {
          setPods(response.data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const CheckArea = () => {
    setCheckArea("");
    if (coordinates.length < 3) {
      setCheckArea("Obszar musi składać się z conajmniej 3 punktów!");
    } else {
      //setModalVisible(false);
    }
  };

  const Checkbox = ({ label, checked, onChange }) => {
    return (
      <label>
        <input style={{margin: "0 10px 10px 0"}} type="radio" checked={checked} onChange={onChange} />
        {label}
      </label>
    );
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

  useEffect(() => {
    Setup();
  }, []);

  return (
<div className="d-flex flex-row bd-highlight" style={{ overflow: "hidden" }}>
      <div
        style={{
          backgroundColor: "white",
          height: "100vh",
          width: "30%",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          alignItems: "center",
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
          onChange={(e) => setAreaName(e.target.value)}
          value={areaname}
          style={errName ? { width: "100%", borderRadius: "20vh", alignItems:"center", borderColor: "red" }:{ width: "100%", borderRadius: "20vh", alignItems:"center" }}
        />

        <br />
        <div style={{ display: "flex", flexDirection: "column", width: "26vw" }}>
          <TimePicker
            onChange={setTime}
            value={timeFrom}
            disableClock={true}
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
            onChange={setTime2}
            value={timeTo}
            disableClock={true}
            className="input "
            style={{ width: "60%", borderRadius: "20vh", marginTop: "20%", justifyContent: "center", margin: 10 }}
          />
          <br />
          {pods.length != 0 ? (
            <Dropdown as={ButtonGroup} onSelect={handleSelect}>
            <Dropdown.Toggle
              id="dropdown-custom-1"
              className="dropdownmap"
              style={{ backgroundColor: "white", borderWidth: 0, color: "black" }}>
              {selectedName}
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors" style={{ width: "95%" }}>
            {pods.map((item) => (
                <Dropdown.Item eventKey={item._id} key={item._id}>
                  {item.firstname + " " + item.lastname}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
            
          ) : (
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                id="dropdown-custom-1"
                className="dropdownmap"
                onSelect={handleSelect}
                style={errPicker ? { backgroundColor: "white", borderColor:"red", borderWidth: 1, color: "black" }:{ backgroundColor: "white", borderWidth: 0, color: "black" }}>
                Brak podopiecznych!
              </Dropdown.Toggle>
              <Dropdown.Menu className="super-colors" style={{ width: "95%" }}></Dropdown.Menu>
            </Dropdown>
          )}
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
            <Checkbox
              label="Codziennie"
              checked={checkedOne}
              onChange={() => {
                setCheckBox(1);
                handleChangeOne();
              }}
            />
            <Checkbox
              label="Co tydzień"
              checked={checkedTwo}
              onChange={() => {
                setCheckBox(2);
                handleChangeTwo();
              }}
            />
            <Checkbox
              label="Nigdy"
              checked={checkedThree}
              onChange={() => {
                setCheckBox(3);
                handleChangeThree();
              }}
            />
          </div>
          <button className="button" style={{ backgroundColor: "deepskyblue", alignSelf: "center" }} onClick={onSubmit}>
            Zatwierdź
          </button>
          <p style={{ color: "red", alignSelf: "center" }}>{check}</p>
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        ref={mapRef}
        center={defaultCenter}
        mapContainerClassName="xd"
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
        onClick={handleMapPress}>
         {coordinates.map((coordinate, index) => (
            <Marker
              key={index}
              coordinate={coordinate}
              onPress={() => {
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
                }
              }}
            >
            </Marker>
          ))}
          {coordinates.length > 0 && (
            <Polygon
              paths={coordinates.map((coord) => ({ lat: coord.latitude, lng: coord.longitude }))}
              strokeColor="blue"
              fillColor="rgba(109, 147, 253, 0.4)"
              strokeWidth={2}
            />
          )}
      </GoogleMap>
    </div>
  );
}

export default AreaScreen;
