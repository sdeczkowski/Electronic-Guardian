import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Check } from "react-bootstrap-icons";
import "../styles/style.css";

function MapScreen() {
  return (
    <div className="mojenieruszac" style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <div style={{display: "flex", justifyContent:"flex-end"}}>
        <Button className="rounded-circle roundbutton bg-light">xd</Button>
      </div>
      <div className="d-flex flex-row-reverse bd-highlight" style={{justifyContent: "space-between"}}>
        <Button className="rounded-circle roundbutton bg-light">xd</Button>
        <Button className="rounded-circle roundbutton bg-light">xd</Button>
      </div>
    </div>
  );
}

export default MapScreen;
