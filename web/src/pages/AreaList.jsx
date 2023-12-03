import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import uni from "../assets/uni.png";
import { VscAdd } from "react-icons/vsc";
import { Nav } from "react-bootstrap";
import { FaMap, FaRegCircleUser, FaLocationDot, FaMessage } from "react-icons/fa6";

function AreaList() {
  const googleMapsApiKey = "AIzaSyBO9ngwlK0mOR2jLp4kJk-2FxRC7ncM0oo";
  const [startDate, setStartDate] = useState(new Date());
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
      <div style={{ position: "absolute", zIndex: 3 }}>
        <Nav className="sidebar">
          <Nav.Item>
            <Nav.Link href="/profile">
              <FaRegCircleUser style={{ color: "#979797", fontSize: "4vh" }} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" href="/">
              <FaMap style={{ color: "#2699c7", fontSize: "4vh" }} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" href="">
              <FaLocationDot style={{ color: "#979797", fontSize: "4vh" }} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" href="/chat">
              <FaMessage style={{ color: "#979797", fontSize: "4vh" }} />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="d-flex flex-row bd-highlight" style={{ position: "relative", left: "6dvw" }}>
        <Card style={{ width: "18rem", margin: "2%" }}>
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap mapContainerStyle={{ height: "300px", width: "100%" }} zoom={13} center={defaultCenter}></GoogleMap>
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

        <Card style={{ width: "18rem", margin: "2%" }}>
          <Card.Body className="d-flex justify-content-center">
            <Button variant="primary" style={{ backgroundColor: "gray", borderColor: "grey", borderRadius: "20vh", width: "40px", height: "40px" }}>
              <VscAdd size={20} color="white" />
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default AreaList;
