import React, { useState } from "react";
import Switch from "react-switch";
import { Nav } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import "../styles/style.css";
import { FaMap, FaRegMap, FaRegCircleUser, FaLocationDot, FaMessage } from "react-icons/fa6";
import { BsChevronRight } from "react-icons/bs";

const Profile = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const handleChange = (checked) => {
    setChecked(checked);
  };
  const handleChange2 = (checked2) => {
    setChecked2(checked2);
  };

  return (
    <div>
      <div style={{ position: "absolute", zIndex: 3 }}>
        <Nav className="sidebar">
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
            <Nav.Link eventKey="link-2" href="">
              <FaLocationDot style={{ color: "#979797", fontSize: "4vh" }} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" href="/chat">
              <FaMessage style={{ color: "#979797", fontSize: "4vh" }} />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="xd" style={{ position: "relative", left: "6dvw" }}>
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
            <BsChevronRight size={20} className="react-switch3" />
          </div>
          <div className="swi">
            <div>Zmień e-mail</div>
            <BsChevronRight size={20} className="react-switch2" />
          </div>
          <div className="xd2 input-container">
            <button className="button">Dezaktywuj konto</button>
            <button className="button">Wyloguj się</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
