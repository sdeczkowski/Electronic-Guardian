import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import uni from "../assets/uni.png";
import { VscAdd } from "react-icons/vsc";

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
    <div className="mojenieruszac" style={{ display: "flex", flexDirection: "column" }}>
      <div className="d-flex flex-row bd-highlight" style={{ margin: "2%" }}>
        <Card style={{ width: "18rem", margin: "2%" }}>
          <Card.Img variant="top" src={uni} />
          <Card.Body>
            <Card.Title>Obszar</Card.Title>
            <Card.Text>
              Dane
              <br></br>
              Dane
              <br></br>
              Dane
              <br></br>
              Dane
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem", margin: "2%" }}>
          <Card.Img variant="top" src={uni} />
          <Card.Body>
            <Card.Title>Nowy obszar</Card.Title>
            <Card.Text>
              Dane
              <br></br>
              Dane
              <br></br>
              Dane
              <br></br>
              Dane
            </Card.Text>
            <Button variant="primary">
              <VscAdd size={20} color="white" />
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default AreaList;
