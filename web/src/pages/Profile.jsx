import React, { useState } from "react";
import Switch from "react-switch";
import { Nav, Button } from "react-bootstrap";
import uni from "../assets/uni.png";
import { FaRegUserCircle } from "react-icons/fa";
import "../styles/style.css";
import { FaMap, FaRegMap, FaRegCircleUser, FaLocationDot, FaMessage } from "react-icons/fa6";
import { BsChevronRight } from "react-icons/bs";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { HiExclamationTriangle } from "react-icons/hi2";
import Form from "react-bootstrap/Form";

const Profile = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  
  const handleChange = (checked) => {
    setChecked(checked);
  };
  const handleChange2 = (checked2) => {
    setChecked2(checked2);
  };

  return (
    <div>
      <div style={{ position: "fixed", zIndex: 3, height: "100vh", backgroundColor: "#979797", overflow: "hidden" }}>
        <Nav style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Button className="rounded-circle roundbutton bg-light" style={{ borderWidth: 1, borderColor: "#979797", backgroundColor: "white", width: "80px", height: "80px" }}>
            <img src={uni} alt="logo" style={{width: "50px", height: "50px"}} />
          </Button>
          <div className="sidebar">
          <Nav.Item>
            <Nav.Link href="/profile">
              <FaRegCircleUser style={{ color: "#2699c7", fontSize: "4vh" }} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" href="/">
              <FaMap style={{ color: "#979797", fontSize: "4vh" }} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" href="/list">
              <FaLocationDot style={{ color: "#979797", fontSize: "4vh" }} />
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
      <div className="xd" style={{ position: "relative", left: "120px" }}>
        <div className="xd2 input-container">
          <FaRegUserCircle size={300} />
        </div>
        <div className="xd3">
          <hr />
          <h6>Profile</h6>
          <hr />
          <div>Imie</div>
          <div>Nazwisko</div>
          <div className="swi">
            <div>Powiadomienia</div>
            <Switch
              onChange={handleChange}
              checked={checked}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch" // Add your custom class for styling
              id="material-switch"
            />
          </div>
          <div className="swi">
            <div>Tryb ciemny</div>
            <Switch
              onChange={handleChange2}
              checked={checked2}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch2" // Add your custom class for styling
              id="material-switch"
            />
          </div>
          <hr />
          <h6>Account</h6>
          <hr />
          <div className="swi">
            <div>Zmień hasło</div>
            <Button variant="link" color="gray" onClick={handleShow2}><BsChevronRight size={20} className="react-switch3" /></Button>
            <Modal  show={show2} onHide={handleClose2}>
              <Modal.Header closeButton >
              </Modal.Header>
              <Modal.Title style={{display:"flex", justifyContent:"center"}} >Zmiana hasła</Modal.Title>
              <Modal.Body style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
              <Form.Control
                type="text"
                placeholder="Stare hasło"
                name="email"
                onChange={handleChange}
                className="input"
                style={{ width: "60%", borderRadius: "20vh" }}
              />
              <Form.Control
                type="text"
                placeholder="Nowy hasło"
                name="email"
                onChange={handleChange}
                className="input"
                style={{ width: "60%", borderRadius: "20vh" }}
              />
              <Form.Control
                type="text"
                placeholder="Powtórz nowe hasło"
                name="email"
                onChange={handleChange}
                className="input"
                style={{ width: "60%", borderRadius: "20vh" }}
              />
              </Modal.Body>
              <Modal.Footer style={{display:"flex", alignContent:"space-between", justifyContent:"center"}}>
                <button className="button1" onClick={handleClose2} style={{display:"flex", justifyContent:"center"}}>
                  Zmień
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="swi">
            <div>Zmień e-mail</div>
            <Button variant="link" onClick={handleShow1}><BsChevronRight size={20} className="react-switch2" /></Button>
            <Modal  show={show1} onHide={handleClose1}>
              <Modal.Header closeButton >
              </Modal.Header>
              <Modal.Title style={{display:"flex", justifyContent:"center"}} >Zmiana adresu e-mial</Modal.Title>
              <Modal.Body style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
              <Form.Control
                type="text"
                placeholder="Stary e-mail"
                name="email"
                onChange={handleChange}
                className="input"
                style={{ width: "60%", borderRadius: "20vh" }}
              />
              <Form.Control
                type="text"
                placeholder="Nowy e-mail"
                name="email"
                onChange={handleChange}
                className="input"
                style={{ width: "60%", borderRadius: "20vh" }}
              />
              <Form.Control
                type="text"
                placeholder="Powtórz nowy e-mail"
                name="email"
                onChange={handleChange}
                className="input"
                style={{ width: "60%", borderRadius: "20vh" }}
              />
              </Modal.Body>
              <Modal.Footer style={{display:"flex", alignContent:"space-between", justifyContent:"center"}}>
                <button className="button1" onClick={handleClose1} style={{display:"flex", justifyContent:"center"}}>
                  Zmień
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="xd2 input-container">
            <button className="button" onClick={handleShow}>Dezaktywuj konto</button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header style={{display:"flex", flexDirection:"column"}}>
                <HiExclamationTriangle size={150} color="red"/>
                <Modal.Title>Dezaktywacja konta</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{display:"flex", justifyContent:"center"}}>Czy na pewno chcesz dezaktywować konto?</Modal.Body>
              <Modal.Footer style={{display:"flex", alignContent:"space-between", justifyContent:"center"}}>
                <Button variant="link" onClick={handleClose} style={{display:"flex", justifyContent:"center"}}>
                  Nie
                </Button>
                <Button variant="link" onClick={handleClose} style={{display:"flex", justifyContent:"center"}}>
                  Tak
                </Button>
              </Modal.Footer>
            </Modal>
            <button className="button" onClick={handleShow}>Wyloguj się</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
