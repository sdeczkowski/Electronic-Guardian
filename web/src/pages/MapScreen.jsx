import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Check} from 'react-bootstrap-icons';
import "../styles/style.css";

function MapScreen() {
  return (
    <Row className='bg-dark'>
        <Col md={6} className="d-flex bg-dark text-light flex-direction-column align-items-center justify-content-center ">
            <h1>Todos</h1>
            <p>Keep your tasks organized</p>
            <LinkContainer to="/Signup">
              <Button variant='info'>Get Started <Check size={25} /><i className='fas fa-comments home-message-icon'></i></Button>
            </LinkContainer>
        </Col>
    </Row>
  )
}

export default MapScreen