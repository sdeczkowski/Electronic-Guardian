import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Clipboard2Check } from "react-bootstrap-icons";
import { FaMap, FaRegMap, FaRegCircleUser, FaLocationDot, FaMessage  } from "react-icons/fa6";
import "../styles/style.css";

function Navi() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const user = localStorage.getItem("token");
  return (
    <Nav
      className="sidebar">
      <Nav.Item>
        <Nav.Link href="/profile">
        <FaRegCircleUser style={{color: "#2699c7", fontSize: '4vh'}}/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" href="/mapscreen">
        <FaMap style={{color: "#2699c7", fontSize: '4vh'}}/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" href="">
        <FaLocationDot style={{color: "#2699c7", fontSize: '4vh'}}/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled"  href="/chat" >
        <FaMessage style={{color: "#2699c7", fontSize: '4vh'}}/>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navi;
