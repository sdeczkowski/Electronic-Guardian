import React, { useState } from "react";
import Switch from "react-switch";
import { Nav, Button } from "react-bootstrap";
import uni from "../assets/uni.png";
import { FaRegUserCircle } from "react-icons/fa";
import "../styles/style.css";
import { FaMap, FaRegMap, FaRegCircleUser, FaLocationDot, FaMessage } from "react-icons/fa6";
import { BsChevronRight } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import { HiExclamationTriangle } from "react-icons/hi2";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Profile = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [newemail, setNewEmail] = useState("");
  const [repeatemail, setRepeatEmail] = useState("");
  const [check, setCheck] = useState(null);
  const [errEmail, setErrEmail] = useState(false);
  const [errNewEmail, setErrNewEmail] = useState(false);
  const [errRepeatEmail, setErrRepeatEmail] = useState(false);

  const toggleDeactivate = () => setShowDeactivate(!showDeactivate);
  const toggleEmail = () => setShowEmail(!showEmail);
  const togglePass = () => setShowPass(!showPass);

  const handleChange = (checked) => {
    setChecked(checked);
  };
  const handleChange2 = (checked2) => {
    setChecked2(checked2);
  };

  const handleEmail = async () => {
    setCheck(null);
    setErrRepeatEmail(false);
    setErrNewEmail(false);
    setErrEmail(false);
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (email === "") {
      setErrEmail(true);
      setCheck("Wpisz email!");
    } else if (newemail === "") {
      setErrNewEmail(true);
      setCheck("Wpisz nowy email!");
    } else if (repeatemail === "") {
      setErrRepeatEmail(true);
      setCheck("Wpisz ponownie nowy email!");
    } else if (repeatemail !== newemail) {
      setErrNewEmail(true);
      setErrRepeatEmail(true);
      setCheck("Emaile nie są identyczne!");
    } else if (!emailRegex.test(newemail)) {
      setErrNewEmail(true);
      setErrRepeatEmail(true);
      setCheck("Niepoprawny email!");
    } else if (email === newemail) {
      setErrEmail(true);
      setErrNewEmail(true);
      setErrRepeatEmail(true);
      setCheck("Nowy i stary email są identyczne!");
    } else {
      const _id = localStorage.getItem("_id");
      try {
        const url = "http://localhost:3001/api/user/updatemail";
        await axios.post(url, {
          _id: _id,
          email: email,
          new_email: newemail,
        });
        toggleEmail();
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          if (error.response.status === 401) {
            if (error.response.data.message === "Inny użytkownik przypisał już ten email") {
              setErrNewEmail(true);
              setErrRepeatEmail(true);
            }
            if (error.response.data.message === "Błędny email") {
              setErrEmail(true);
            }
            setCheck(error.response.data.message);
          }
        }
      }
    }
  };

  const LogOut = () => {
    localStorage.clear();
    window.location.replace("/");
  };

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
            <Button variant="link" color="gray" onClick={togglePass}>
              <BsChevronRight size={20} className="react-switch3" />
            </Button>
            <Modal show={showPass} onHide={togglePass}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Title style={{ display: "flex", justifyContent: "center" }}>Zmiana hasła</Modal.Title>
              <Modal.Body
                style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <Form.Control
                  type="text"
                  placeholder="Stare hasło"
                  name="email"
                  onChange={handleChange}
                  className="input"
                  style={{ width: "60%", borderRadius: "20vh", marginTop: "10px" }}
                />
                <Form.Control
                  type="text"
                  placeholder="Nowy hasło"
                  name="email"
                  onChange={handleChange}
                  className="input"
                  style={{ width: "60%", borderRadius: "20vh", marginTop: "10px" }}
                />
                <Form.Control
                  type="text"
                  placeholder="Powtórz nowe hasło"
                  name="email"
                  onChange={handleChange}
                  className="input"
                  style={{ width: "60%", borderRadius: "20vh", marginTop: "10px" }}
                />
              </Modal.Body>
              <Modal.Footer style={{ display: "flex", alignContent: "space-between", justifyContent: "center" }}>
                <button className="button" style={{ backgroundColor: "deepskyblue" }} onClick={togglePass}>
                  Zmień
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="swi">
            <div>Zmień email</div>
            <Button variant="link" onClick={toggleEmail}>
              <BsChevronRight size={20} className="react-switch2" />
            </Button>
            <Modal show={showEmail} onHide={toggleEmail}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Title style={{ display: "flex", justifyContent: "center" }}>Zmiana adresu email</Modal.Title>
              <Modal.Body
                style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <Form.Control
                  type="text"
                  placeholder="Stary e-mail"
                  name="email"
                  onChange={handleChange}
                  className="input"
                  style={{ width: "60%", borderRadius: "20vh", marginTop: "10px" }}
                />
                <Form.Control
                  type="text"
                  placeholder="Nowy e-mail"
                  name="email"
                  onChange={handleChange}
                  className="input"
                  style={{ width: "60%", borderRadius: "20vh", marginTop: "10px" }}
                />
                <Form.Control
                  type="text"
                  placeholder="Powtórz nowy e-mail"
                  name="email"
                  onChange={handleChange}
                  className="input"
                  style={{ width: "60%", borderRadius: "20vh", marginTop: "10px" }}
                />
              </Modal.Body>
              <Modal.Footer style={{ display: "flex", alignContent: "space-between", justifyContent: "center" }}>
                <button className="button" style={{ backgroundColor: "deepskyblue" }} onClick={handleEmail}>
                  Zmień
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="xd2 input-container">
            <button className="button" onClick={toggleDeactivate}>
              Dezaktywuj konto
            </button>
            <Modal show={showDeactivate} onHide={toggleDeactivate}>
              <Modal.Header style={{ display: "flex", flexDirection: "column" }}>
                <HiExclamationTriangle size={150} color="red" />
                <Modal.Title>Dezaktywacja konta</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
                Czy na pewno chcesz dezaktywować konto?
              </Modal.Body>
              <Modal.Footer style={{ display: "flex", alignContent: "space-between", justifyContent: "center" }}>
                <Button
                  variant="link"
                  onClick={toggleDeactivate}
                  style={{ display: "flex", justifyContent: "center", textDecoration: "none", color: "black" }}>
                  Nie
                </Button>
                <Button
                  variant="link"
                  onClick={toggleDeactivate}
                  style={{ display: "flex", justifyContent: "center", textDecoration: "none", color: "black" }}>
                  Tak
                </Button>
              </Modal.Footer>
            </Modal>
            <button className="button" onClick={LogOut}>
              Wyloguj się
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
