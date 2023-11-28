import React, { useState, useEffect,useRef } from 'react';
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
    <div className='d-flex flex-row justify-content-end'>
      <div className="d-flex bg-dark text-light align-items-center justify-content-end ">
        <Button className='button roundbutton'>xd</Button>
        <h1>Todos</h1>
        <p>Keep your tasks organized</p>
        <LinkContainer to="/Signup">
          <Button variant='info'>Get Started <Check size={25} /><i className='fas fa-comments home-message-icon'></i></Button>
        </LinkContainer>
      </div>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter} />
    </LoadScript>
      <div>
        <h1>xd</h1>
      </div>
    </div>
  )
}

export default MapScreen