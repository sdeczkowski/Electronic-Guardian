import React, { useState } from "react";
import { GoogleMap, Polygon } from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import uni from "../assets/uni.png";
import { useNavigate } from "react-router-dom";
import { VscAdd } from "react-icons/vsc";
import { Nav } from "react-bootstrap";
import { FaMap, FaRegCircleUser, FaLocationDot, FaMessage } from "react-icons/fa6";
import { useEffect } from "react";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";

function AreaList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const mapRef = React.useRef(null);

  const opcje = [
    { id: 1, label: "Codziennie" },
    { id: 2, label: "Co tydzień" },
    { id: 3, label: "Nigdy" },
  ];

  const deleteArea = async (_opid, _podid, name) => {
    try {
      const url = "http://localhost:3001/api/area/delete";
      await axios.post(url, {
        _opid: _opid,
        _podid: _podid,
        name: name,
      });
      AreaSetup()
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const AreaSetup = async () => {
    try {
      const id = localStorage.getItem("_id");
      const url = "http://localhost:3001/api/area/getall/" + id;
      await axios.get(url).then((response) => {
        if (response && response.data) {
          setData(response.data);
          setLoading(false);
        }
      });
    } catch (error) {
      if (error.response.status === 404) {
        console.log(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    AreaSetup();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
        <FallingLines color="deepskyblue" width="100" visible={true} ariaLabel="falling-lines-loading" />
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ position: "fixed", zIndex: 3, height: "100vh", backgroundColor: "#979797", overflow: "hidden" }}>
          <Nav style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Button
              className="rounded-circle roundbutton bg-light"
              style={{
                borderWidth: 1,
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
                  <FaMap style={{ color: "#979797", fontSize: "4vh" }} />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2" href="/list">
                  <FaLocationDot style={{ color: "#2699c7", fontSize: "4vh" }} />
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
        <h1 style={{ position: "fixed", left: "120px" }}>Lista</h1>
        <div style={{ position: "relative", left: "120px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "97vh",
            }}>
            {data.map((item) => {
              return (
                <Card style={{ width: "20dvw", height: "65dvh", marginRight: "20px" }} key={item._id}>
                  <GoogleMap
                    ref={mapRef}
                    mapContainerStyle={{ height: "300px", width: "100%" }}
                    zoom={13}
                    center={{ lat: item.initialRegion.latitude, lng: item.initialRegion.longitude }}
                    options={{
                      zoomControl: false,
                      mapTypeControl: false,
                      scaleControl: false,
                      streetViewControl: false,
                      rotateControl: false,
                      fullscreenControl: false,
                    }}>
                    <Polygon
                      visible={true}
                      key={item._id}
                      paths={item.cords.flat().map((point) => {
                        return {
                          lat: parseFloat(point.latitude),
                          lng: parseFloat(point.longitude),
                        };
                      })}></Polygon>
                  </GoogleMap>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      Podopieczny: {item.pod_firstname + " " + item.pod_lastname}
                      <br />
                      Data: {item.date}
                      <br />
                      Czas od: {item.time_from}
                      <br />
                      Czas do: {item.time_to}
                      <br />
                      Cykliczność: {opcje[item.repeat - 1].label}
                    </Card.Text>
                    <Button variant="danger" onClick={() => {deleteArea(item._opid, item._podid, item.name)}}>Usuń</Button>
                  </Card.Body>
                </Card>
              );
            })}
            <Card
              style={{ width: "20dvw", height: "65dvh", marginRight: "20px" }}
              onClick={() => {
                navigate("/area");
              }}>
              <Card.Body
                style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Button
                  className="rounded-circle roundbuttonNOSHADOW bg-light"
                  style={{ borderWidth: 1, borderColor: "#979797", backgroundColor: "white" }}>
                  <VscAdd size={20} color="black" />
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default AreaList;
