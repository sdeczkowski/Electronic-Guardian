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
      className="sidebar"
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
      <Nav.Item>
        <Nav.Link href="/home">
        <FaRegCircleUser style={{color: "blue", fontSize: '4vh'}}/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">
        <FaMap style={{color: "blue", fontSize: '4vh'}}/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">
        <FaLocationDot style={{color: "blue", fontSize: '4vh'}}/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
        <FaMessage style={{color: "blue", fontSize: '4vh'}}/>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navi;
