import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import uni from "../assets/uni.png";
import { useNavigate } from "react-router-dom";
import { VscAdd } from "react-icons/vsc";
import { Nav } from "react-bootstrap";
import { FaMap, FaRegCircleUser, FaLocationDot, FaMessage } from "react-icons/fa6";
import { useEffect } from "react";

function AreaList() {
  const googleMapsApiKey = "AIzaSyBO9ngwlK0mOR2jLp4kJk-2FxRC7ncM0oo";
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [pod, setPod] = useState();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [error, setErr] = useState();
  //let areaData = route.params.data;
  


  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 40.748817,
    lng: -73.985428,
  };
/*
  const podData = async () => {
    try {
      const url =
        "http://10.0.2.2:3001/api/area/get/" +
        route.params._opid +
        "/" +
        route.params._podid +
        "/" +
        route.params.name;

      const response = await axios.get(url);

      if (response && response.data) {
        setPod(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
*/
  const deleteArea = async () => {
    try {
      const url = "http://10.0.2.2:3001/api/area/delete";
      await axios.post(url, {
       // _opid: route.params._opid,
        //_podid: route.params._podid,
       // name: route.params.name,
      });
      navigation.navigate("AreaSelect");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
   // podData();
  }, []);

  const opcje = [
    { id: 1, label: "Codziennie" },
    { id: 2, label: "Co tydzień" },
    { id: 3, label: "Nigdy" },
  ];

  const AreaSetup = async () => {
    try {
      const id = await AsyncStorage.getItem("_id");
      const url = "http://10.0.2.2:3001/api/area/getall/" + id;

      
      const response = await axios.get(url);

      if (response && response.data) {
        setData(response.data);
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErr(error.response.data.message);
      }
    }
  };

  const AreaSelect = async (_podid, name) => {
    const id = await AsyncStorage.getItem("_id");
    
  };

  useEffect(() => {
    AreaSetup();
  }, []);

  return (
    <div>
      <div style={{ position: "fixed", zIndex: 3, height: "100vh", backgroundColor: "#979797", overflow: "hidden" }}>
        <Nav style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            className="rounded-circle roundbutton bg-light"
            style={{ borderWidth: 1, borderColor: "#979797", backgroundColor: "white", width: "80px", height: "80px" }}>
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
          <Card style={{ width: "20dvw", height: "65dvh", marginRight: "20px" }}>
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={{ height: "300px", width: "100%" }}
                zoom={13}
                center={defaultCenter}
                options={{
                  fullscreenControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  zoomControl: false,
                  controlSize: false
                }}></GoogleMap>
            </LoadScript>
            <Card.Body>
              <Card.Title>Nazwa obszaru</Card.Title>
              <Card.Text>
                Podopieczny
                <br />
                Data
                <br />
                Czas
                <br />
                Współrzędne
                <br />
                Cykliczność
              </Card.Text>
              <Button variant="primary">Check</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "20dvw", height: "65dvh", marginRight: "20px" }} onClick={() => navigate("/area")}>
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

export default AreaList;
