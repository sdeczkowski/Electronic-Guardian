import React, { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, Polygon  } from "@react-google-maps/api";
import { Button, Nav } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import { FaMap, FaRegCircleUser, FaLocationDot, FaMessage } from "react-icons/fa6";
import axios from "axios";

function AreaScreen({ addArea }) {
  const googleMapsApiKey = "AIzaSyBO9ngwlK0mOR2jLp4kJk-2FxRC7ncM0oo";
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState("10:00");
  const [value2, onChange2] = useState("10:00");
  const [location, setLocation] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [coordinates, setCoordinates] = useState([]);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null); // Dodaj nowy stan
  const [mapRegionComplete, setRegionComplete] = useState([]);
  const [areaname, setAreaName] = useState("");
  const [pods, setPods] = useState([]);
  const [errDate, setErrDate] = useState(false);
  const [errTime, setErrTime] = useState(false);
  const [errTime2, setErrTime2] = useState(false);
  const [check, setCheck] = useState(null);
  const [errName, setErrName] = useState(false);
  const [checkArea, setCheckArea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState(null);
  const [checked, setChecked] = React.useState(false);
  const [errPicker, setErrPicker] = useState(false);
  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);
  const [checkedThree, setCheckedThree] = React.useState(false);
  
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

  const Checkbox = ({ label, checked, onChange }) => {
    return (
      <label>
        <input type="radio" checked={checked} onChange={onChange} />
        {label}
      </label>
    );
  };

  const linesIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    const a = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const b = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
    const c = (x2 - x3) * (y1 - y3) - (y2 - y3) * (x1 - x3);
    const d = (x2 - x4) * (y1 - y3) - (y2 - y4) * (x1 - x3);

    return a * b < 0 && c * d < 0;
  };

  const onEdit = useCallback(() => {
    // Assuming 'coordinates' is the state variable representing your polygon's path
    const editedCoordinates = coordinates.map(coord => ({
      latitude: coord.latitude, // or whatever your coordinate property names are
      longitude: coord.longitude,
    }));

    // Perform any additional logic with the edited coordinates
    // For example, you might want to update state or perform some validation
    console.log('Coordinates edited:', editedCoordinates);
    // Update state or perform additional logic as needed
  }, [coordinates]);


  const handleMapPress = useCallback((event) => {
    const { latLng } = event;
    const coordinate = { latitude: latLng.lat(), longitude: latLng.lng() };
    const hasIntersections = checkForIntersections(coordinate);

    setCoordinates((prevCoordinates) => [...prevCoordinates, coordinate]);

    if (hasIntersections) {
      // Reset the entire polygon if intersections are found
      setCoordinates([]);
      setSelectedCoordinate(null);
    } else {
      // Add the new point to the polygon if no intersections
      setCoordinates((prevCoordinates) => [...prevCoordinates, coordinate]);
      setSelectedCoordinate(coordinate);
    }

    onEdit(); // Call the function to handle editing
  }, [onEdit, selectedCoordinate, checkForIntersections]);


  const opcje = [
    { id: 1, label: "Codziennie" },
    { id: 2, label: "Co tydzień" },
    { id: 3, label: "Nigdy" },
  ];

  const selectOptions = (optionId) => {
    setOption(optionId);
  };

  const onSubmit = async () => {
    // Reset error states and checks
    setErrTime(false);
    setErrDate(false);
    setCheck(null);
    setErrName(false);
    setErrPicker(false);
    setCheck("");
  
    // Validate form inputs
    if (!startDate) {
      setErrDate(true);
      setCheck("Wybierz datę!");
    } else if (!value) {
      setErrTime(true);
      setCheck("Wybierz czas rozpoczęcia!");
    } else if (!value2) {
      setErrTime2(true);
      setCheck("Wybierz czas zakończenia!");
    } else if (value >= value2) {
      setErrTime2(true);
      setCheck("Czas zakończenia musi być późniejszy od czasu rozpoczęcia!");
    } else if (option === null) {
      setCheck("Wybierz cykliczność!");
    } else if (!areaname.trim()) {
      setErrName(true);
      setCheck("Podaj nazwę obszaru!");
    } else if (!selectedValue) {
      setErrPicker(true);
      setCheck("Wybierz podopiecznego!");
    } else if (coordinates.length === 0) {
      setCheck("Nie wybrano obszaru!");
    } else {
      // All inputs are valid, proceed with adding the area
      const id = localStorage.getItem("_id");
      try {
        // API call to add the area
        const url = "http://localhost:3001/api/area";
        await axios.post(url, {
          _opid: id,
          _podid: selectedValue,
          name: areaname,
          cords: coordinates,
          initialRegion: mapRegionComplete,
          date: startDate.toString(),
          repeat: option,
          time_f: value.toString(),
          time_t: value2.toString(),
          isActive: false,
        });
  
        // Assuming you have a newArea object with relevant data
        const newArea = {
          name: areaname,
          // ... other relevant data ...
          date: startDate,
          timeFrom: value,
          timeTo: value2,
          repeat: option,
          coordinates: coordinates,
        };
  
        // Call the addArea function passed from AreaList to update the areas list
        addArea(newArea);
  
        // Reset form state or perform any additional logic as needed
  
        // Navigation logic, if applicable
        // navigation.navigate("AreaSelect");
      } catch (error) {
        // Handle API call errors
        console.error("Błąd podczas zapisywania danych:", error);
      }
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
            onChange={(e) => setAreaName(e.target.value)}
            value={areaname}
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
              <Checkbox label="Codziennie" checked={checkedOne} onChange={handleChangeOne} />
              <Checkbox label="Co tydzień" checked={checkedTwo} onChange={handleChangeTwo} />
              <Checkbox label="Nigdy" checked={checkedThree} onChange={handleChangeThree} />
            </div>
            <button
              className="button" style={{ backgroundColor: "deepskyblue" }} onClick={onSubmit}>
              Zatwierdź
            </button>
          </div>
        </div>
        <LoadScript googleMapsApiKey={googleMapsApiKey}>      
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
          options={{
            // ... (other options)
          }}
          onClick={handleMapPress}
          onRegionChangeComplete={(region) => {
            setRegionComplete({
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            });
          }}
        >
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
          {coordinates.length > 2 && (
            <Polygon
              editable
              draggable
              paths={coordinates.map((coord) => ({ lat: coord.latitude, lng: coord.longitude }))}
              strokeColor="blue"
              fillColor="rgba(109, 147, 253, 0.4)"
              strokeWidth={2}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default AreaScreen;
