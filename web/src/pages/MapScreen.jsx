import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Check } from 'react-bootstrap-icons';
import "../styles/style.css";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function MapScreen() {
 
  const googleMapsApiKey = 'AIzaSyBO9ngwlK0mOR2jLp4kJk-2FxRC7ncM0oo';

  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 40.748817,
    lng: -73.985428,
  };
  


  return (
    <div className="mojenieruszac" style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <div style={{display: "flex", justifyContent:"flex-end"}}>
        <Button className="rounded-circle roundbutton bg-light">xd</Button>
      </div>
      <div className="d-flex flex-row-reverse bd-highlight" style={{justifyContent: "space-between"}}>
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter} />
        </LoadScript>
        <Button className="rounded-circle roundbutton bg-light">xd</Button>
        <Button className="rounded-circle roundbutton bg-light">xd</Button>
      </div>
    </div>
  );
}

export default MapScreen;
