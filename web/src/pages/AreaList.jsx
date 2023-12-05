import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import uni from "../assets/uni.png";
import { useNavigate } from "react-router-dom";
import { VscAdd } from "react-icons/vsc";
import { Nav } from "react-bootstrap";
import { FaMap, FaRegCircleUser, FaLocationDot, FaMessage } from "react-icons/fa6";
import AreaScreen from "./AreaScreen"; 

function AreaList() {
  const googleMapsApiKey = "AIzaSyBO9ngwlK0mOR2jLp4kJk-2FxRC7ncM0oo";
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [areas, setAreas] = useState([]);  // State to store the list of areas

  // Function to add a new area to the list
  const addArea = (newArea) => {
    setAreas((prevAreas) => [...prevAreas, newArea]);
  };

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 40.748817,
    lng: -73.985428,
  };

  return (
    <div>
      <div style={{ position: "fixed", zIndex: 3, height: "100vh", backgroundColor: "#979797", overflow: "hidden" }}>
        <Nav style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            className="rounded-circle roundbutton bg-light"
            style={{ borderWidth: 1, borderColor: "#979797", backgroundColor: "white", width: "80px", height: "80px" }}>
            <img src={uni} alt="logo" style={{ width: "50px", height: "50px" }} />
          </Button>
          <div className="sidebar">
            <Nav.Item>
              <Nav.Link href="/profile">
                <FaRegCircleUser style={{ color: "#979797", fontSize: "4vh" }} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" href="/">
                <FaMap style={{ color: "#979797", fontSize: "4vh" }} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2" href="/list">
                <FaLocationDot style={{ color: "#2699c7", fontSize: "4vh" }} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="disabled" href="/chat">
                <FaMessage style={{ color: "#979797", fontSize: "4vh" }} />
              </Nav.Link>
            </Nav.Item>
          </div>
        </Nav>
      </div>
      <div style={{ position: "relative", left: "120px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "97vh",
          }}>
          <Card style={{ width: "20dvw", height: "65dvh", marginRight: "20px" }}>
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={{ height: "300px", width: "100%" }}
                zoom={13}
                center={defaultCenter}
                options={{
                  fullscreenControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  zoomControl: false,
                  controlSize: false
                }}></GoogleMap>
            </LoadScript>
            <Card.Body>
              <Card.Title>Nazwa obszaru</Card.Title>
              <Card.Text>
                Podopieczny
                <br />
                Data
                <br />
                Czas
                <br />
                Współrzędne
                <br />
                Cykliczność
              </Card.Text>
              <Button variant="primary">Check</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "20dvw", height: "65dvh", marginRight: "20px" }} onClick={() => navigate("/area")}>
            <Card.Body
              style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Button
                className="rounded-circle roundbuttonNOSHADOW bg-light"
                style={{ borderWidth: 1, borderColor: "#979797", backgroundColor: "white" }}>
                <VscAdd size={20} color="black" />
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AreaList;
