import React, { useState, useEffect } from "react";
import { Row, Col, Button, ListGroup, Dropdown, ButtonGroup, Nav, Card, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Check } from "react-bootstrap-icons";
import uni from "../assets/uni.png";
import "../styles/style.css";
import { Bell, QrCode, XLg } from "react-bootstrap-icons";
import { FaMap, FaRegCircleUser, FaLocationDot, FaMessage } from "react-icons/fa6";
import { LoadScript, GoogleMap, Marker, Polygon } from "@react-google-maps/api";
import moment from "moment";

function MapScreen() {
  const googleMapsApiKey = "AIzaSyBO9ngwlK0mOR2jLp4kJk-2FxRC7ncM0oo";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [path, setPath] = useState([
    { lat: 52.52549080781086, lng: 13.398118538856465 },
    { lat: 52.48578559055679, lng: 13.36653284549709 },
    { lat: 52.48871246221608, lng: 13.44618372440334 },
  ]);
  const [displayNoti, setDisplayNoti] = useState(false);

  const defaultCenter = {
    lat: 51.237953,
    lng: 22.529214,
  };

  const ShowNoti = () => {
    if (displayNoti) {
      setDisplayNoti(false);
    } else {
      setDisplayNoti(true);
    }
  };

  const generateCode = () => {
    const code = Math.floor(Math.random() * 900000) + 100000;
    return code;
  };

  const [code, setCode] = useState(generateCode());

  return (
    <div>
      <div style={{ position: "absolute", zIndex: 3 }}>
        <Nav style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            className="rounded-circle roundbutton bg-light"
            style={{ borderWidth: 0, borderColor: "#979797", backgroundColor: "white", width: "80px", height: "80px" }}>
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
                <FaMap style={{ color: "#2699c7", fontSize: "4vh" }} />
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

      <LoadScript id="script-loader" googleMapsApiKey={googleMapsApiKey} language="en" region="us">
        <div style={{ height: "100%", width: "100%", position: "relative" }}>
          <div className="map" style={{ zIndex: 1, position: "absolute" }}>
            <GoogleMap
              mapContainerStyle={{ height: "100vh", width: "100vw" }}
              zoom={13}
              center={defaultCenter}
              options={{
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: false,
              }}>
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
            <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row-reverse" }}>
              <Button
                className="rounded-circle roundbutton bg-light"
                style={{ color: "black", zIndex: 2, borderWidth: 0 }}
                onClick={ShowNoti}>
                <Bell size={35} color="#979797" />
              </Button>
              {displayNoti && (
                <Card className="shadow noti" style={{ height: "60vh", overflow: "auto" }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <div style={{display: "flex", backgroundColor: "rgb(204, 204, 204)", width: "30vw", height:"15vh", borderRadius: "20px", padding: "10px", justifyContent: "space-between"}}>
                        <div style={{display:"flex", flexDirection: "column", justifyContent: "space-between"}}>
                          <div style={{display: "flex"}}>
                          <div style={{backgroundColor: "rgb(88, 88, 88)", width: "30px", height:"30px", borderRadius: "5px", marginRight: "5px"}}></div>
                          <b>Nazwa użytkownika</b>
                          </div>
                          <text>xddsdfs</text>
                          <text>xddsdfs</text>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-around"}}>
                        {moment(new Date()).fromNow()}
                        <div style={{backgroundColor: "rgb(88, 88, 88)", width: "45px", height:"45px", borderRadius: "5px"}}></div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                  <button className="roundbutton" style={{width: "30px", height: "30px"}}><XLg/></button>
                </Card>
              )}
            </div>
            <div
              className="d-flex flex-row-reverse bd-highlight"
              style={{ justifyContent: "space-between", zIndex: 2 }}>
              <Button className="rounded-circle roundbutton bg-light" style={{ borderWidth: 0 }} onClick={handleShow}>
                <QrCode size={35} color="#979797" />
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ display: "flex", flexDirection: "column" }}>
                  <Modal.Title>Kod podopiecznego</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: "flex", justifyContent: "center", fontSize: "100px" }}>{code}</Modal.Body>
                <Modal.Footer style={{ display: "flex", alignContent: "space-between", justifyContent: "center" }}>
                  <Button
                    variant="link"
                    onClick={handleClose}
                    style={{ display: "flex", justifyContent: "center", textDecoration: "none", color: "black" }}>
                    Zamknij
                  </Button>
                </Modal.Footer>
              </Modal>
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle
                  id="dropdown-custom-1"
                  className="dropdownmap"
                  style={{ backgroundColor: "white", borderWidth: 0, color: "black" }}>
                  Pow! Zoom!
                </Dropdown.Toggle>
                <Dropdown.Menu className="super-colors" style={{ width: "95%" }}>
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
