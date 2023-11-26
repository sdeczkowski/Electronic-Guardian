import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Check} from 'react-bootstrap-icons';
import "../styles/style.css";

function MapScreen() {
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
        <div>
        <h1>xd</h1>
        </div>
    </div>
  )
}

export default MapScreen