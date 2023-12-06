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
import axios from "axios";
import { FallingLines } from "react-loader-spinner";

function MapScreen() {
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

  const [mapRegion, setMapRegion] = useState({});
  const [location, setLocation] = useState();
  const [podloc, setPodLoc] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null); // Dodaj nowy stan
  const [loading, setLoading] = useState(true);
  const [newNoti, setNewNoti] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState("");
  const [selectedValue, setSelectedValue] = useState("Podopieczny");
  const [isVisible, setIsVisible] = useState(true);
  const [modalInput, setModalInput] = useState("");
  const [code, setCode] = useState();
  const [pods, setPods] = useState([]);
  const [podArea, setPodArea] = useState([]);
  const [freshLocation, setFreshLoc] = useState(false);
  const [check, setCheck] = useState("");

  const Setup = async () => {
    const id = localStorage.getItem("_id");
    try {
      const url = "http://localhost:3001/api/noti/get/" + id;
      axios.get(url).then((response) => {
        if (response && response.data) {
          response.data.notifications.map((item) => {
            if (!item.seen) {
              setNewNoti(true);
            }
          });
          console.log("powiadomienia - odebrane");
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
    try {
      const url = "http://localhost:3001/api/user/code/" + id;
      axios.get(url).then((response) => {
        if (response && response.data) {
          setCode(response.data);
          console.log("kod - odebrany");
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
    try {
      const url = "http://localhost:3001/api/user/getpods/" + id;
      axios.get(url).then((response) => {
        if (response && response.data) {
          setPods(response.data);
          console.log("podopieczni - odebrani");
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
    setLoading(false);
  };

  const isPodinArea = async (item) => {
    let date = new Date();
    date = date.getTime();
    try {
      const url = "http://localhost:3001/api/user/podloc/" + item._podid;
      axios.get(url).then((response) => {
        if (response && response.data) {
          setPodLoc(response.data.location);
          let poddate = Date.parse(response.data.location_date);
          if (date < poddate + 1000000) {
            setFreshLoc(true);
          }
          if (item.isActive) {
            checkIfInsidePolygon(response.data.location.latitude, response.data.location.longitude, item);
          }
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const isPointInPolygon = (point, polygon) => {
    let oddNodes = false;
    let j = polygon.length - 1;

    for (let i = 0; i < polygon.length; i++) {
      const vertexI = polygon[i];
      const vertexJ = polygon[j];

      if (
        (vertexI.longitude < point.longitude && vertexJ.longitude >= point.longitude) ||
        (vertexJ.longitude < point.longitude && vertexI.longitude >= point.longitude)
      ) {
        if (
          vertexI.latitude +
            ((point.longitude - vertexI.longitude) / (vertexJ.longitude - vertexI.longitude)) *
              (vertexJ.latitude - vertexI.latitude) <
          point.latitude
        ) {
          oddNodes = !oddNodes;
        }
      }

      j = i;
    }
    return oddNodes;
  };

  const checkIfInsidePolygon = async (platitude, plongitude, item) => {
    const point = {
      latitude: platitude,
      longitude: plongitude,
    };
    const isInside = isPointInPolygon(point, item.cords);
    if (isInside) {
      if (!item.loc_status) {
        console.log("Jesteś w obszarze");
        item.loc_status = true;
      }
    } else {
      if (item.loc_status) {
        console.log("Jesteś poza obszarem");
        await NotiSend(item._podid, item.name);
        item.loc_status = false;
      }
    }
  };

  const NotiSend = async (_podid, name) => {
    const id = localStorage.getItem("_id");
    const date = new Date();
    try {
      const url = "http://localhost:3001/api/noti/add";
      axios.post(url, {
        _opid: id,
        _podid: _podid,
        title: "Podopieczny opuścił obszar",
        details: "Podopieczny opuścił obszar: " + name,
        areaname: name,
        date: date.toISOString(),
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const GetPodArea = async (_podid) => {
    if (_podid == "") {
      setPodArea([]);
      setPodLoc(null);
    } else {
      const id = localStorage.getItem("_id");
      try {
        const url = "http://localhost:3001/api/area/getpodarea/" + id + "/" + _podid;
        axios.get(url).then((response) => {
          if (response && response.data) {
            setPodArea(response.data);
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
      try {
        const url = "http://localhost:3001/api/user/podloc/" + _podid;
        axios.get(url).then((response) => {
          if (response && response.data) {
            setPodLoc(response.data.location);
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    Setup();
  }, []);

  useEffect(() => {
    const intId = setInterval(() => {
      if (podArea.length > 0) {
        podArea.map((item) => {
          isPodinArea(item);
        });
      }
    }, 10000);
    return () => {
      clearInterval(intId);
    };
  }, [podArea]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
        <FallingLines color="deepskyblue" width="100" visible={true} ariaLabel="falling-lines-loading" />
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ position: "absolute", zIndex: 3 }}>
          <Nav style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Button
              className="rounded-circle roundbutton bg-light"
              style={{
                borderWidth: 0,
                borderColor: "#979797",
                backgroundColor: "white",
                width: "80px",
                height: "80px",
              }}>
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
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "rgb(204, 204, 204)",
                          width: "30vw",
                          height: "15vh",
                          borderRadius: "20px",
                          padding: "10px",
                          justifyContent: "space-between",
                        }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <div style={{ display: "flex" }}>
                            <div
                              style={{
                                backgroundColor: "rgb(88, 88, 88)",
                                width: "30px",
                                height: "30px",
                                borderRadius: "5px",
                                marginRight: "5px",
                              }}></div>
                            <b>Nazwa użytkownika</b>
                          </div>
                          <text>xddsdfs</text>
                          <text>xddsdfs</text>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            justifyContent: "space-around",
                          }}>
                          {moment(new Date()).fromNow()}
                          <div
                            style={{
                              backgroundColor: "rgb(88, 88, 88)",
                              width: "45px",
                              height: "45px",
                              borderRadius: "5px",
                            }}></div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                  <button className="roundbutton" style={{ width: "30px", height: "30px" }}>
                    <XLg />
                  </button>
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
              {pods.length != 0 ? (
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    id="dropdown-custom-1"
                    className="dropdownmap"
                    style={{ backgroundColor: "white", borderWidth: 0, color: "black" }}>
                    Wybierz podopiecznego!
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "95%" }}>
                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="3" active>
                      Active Item
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    id="dropdown-custom-1"
                    className="dropdownmap"
                    style={{ backgroundColor: "white", borderWidth: 0, color: "black" }}>
                    Brak podopiecznych!
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="super-colors" style={{ width: "95%" }}></Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapScreen;
