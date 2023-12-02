import React, { useState, useEffect } from "react";
import { Row, Col, Button, DropdownButton, Dropdown, ButtonGroup, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Check } from "react-bootstrap-icons";
import "../styles/style.css";
import { FaMap, FaRegMap, FaRegCircleUser, FaLocationDot, FaMessage  } from "react-icons/fa6";
import {LoadScript, GoogleMap, Marker, Polygon } from "@react-google-maps/api";

function MapScreen() {
  const googleMapsApiKey = "AIzaSyBO9ngwlK0mOR2jLp4kJk-2FxRC7ncM0oo";
  const [path, setPath] = useState([
    { lat: 52.52549080781086, lng: 13.398118538856465 },
    { lat: 52.48578559055679, lng: 13.36653284549709 },
    { lat: 52.48871246221608, lng: 13.44618372440334 }
  ]);
  const mapStyles = {
    height: "100vh",
    width: "100vw",
  };

  const defaultCenter = {
    lat: 51.237953,
    lng: 22.529214,
  };

  return (
    <div>
      <div style={{position: "absolute", zIndex: 3}}>
      <Nav
      className="sidebar">
      <Nav.Item>
        <Nav.Link href="/profile">
        <FaRegCircleUser style={{color: "#979797", fontSize: '4vh'}}/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" href="/">
        <FaMap style={{color: "#2699c7", fontSize: '4vh'}}/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" href="">
        <FaLocationDot style={{color: "#979797", fontSize: '4vh'}}/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled"  href="/chat" >
        <FaMessage style={{color: "#979797", fontSize: '4vh'}}/>
        </Nav.Link>
      </Nav.Item>
    </Nav>
    </div>
    
    <LoadScript id="script-loader" googleMapsApiKey={googleMapsApiKey} language="en" region="us">
      <div style={{ height: "100%", width: "100%", position: "relative" }}>
        <div className="map" style={{ zIndex: 1, position: "absolute" }}>
          <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
          <Polygon
            // Make the Polygon editable / draggable
            editable
            draggable
            path={path}
          />
            <Marker position={defaultCenter} />
          </GoogleMap>
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100vw",
            height: "100vh",
          }}>
          <div style={{ display: "flex", justifyContent: "flex-end", zIndex: 2 }}>
            <Button className="rounded-circle roundbutton bg-light" style={{ color: "black", borderWidth: 0 }}>
              xd
            </Button>
          </div>
          <div className="d-flex flex-row-reverse bd-highlight" style={{ justifyContent: "space-between", zIndex: 2 }}>
            <Button className="rounded-circle roundbutton bg-light" style={{ borderWidth: 0 }}>
              xd
            </Button>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                id="dropdown-custom-1"
                className="dropdownmap"
                style={{ backgroundColor: "white", borderWidth: 0, color: "black" }}>
                Pow! Zoom!
              </Dropdown.Toggle>
              <Dropdown.Menu className="super-colors">
                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3" active>
                  Active Item
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </LoadScript>
    </div>
  );
}

export default MapScreen;
