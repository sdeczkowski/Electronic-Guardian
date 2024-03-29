import React, { useState, useEffect, useId } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { Nav, Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import uni from "../assets/uni.png";
import { FaMap, FaRegCircleUser, FaLocationDot, FaMessage, FaList, FaX } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FallingLines } from "react-loader-spinner";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const [loading, setLoading] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState([]);
  const [_id1, setID1] = useState();
  const [_id2, setID2] = useState();
  const [name, setName] = useState("Wybierz użytkownika");
  const [showModal, setShowModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const toggleDelete = () => setDeleteMode(!deleteMode);
  const toggleModal = () => setShowModal(!showModal);

  const Setup = async () => {
    const id = localStorage.getItem("_id");
    setID1(id);
    try {
      const url = "http://localhost:3001/api/chat/getpods/" + id + "/op";
      axios.get(url).then((response) => {
        if (response && response.data) {
          setData(response.data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const GetChat = async () => {
    try {
      const url = "http://localhost:3001/api/chat/set/" + _id1 + "/" + _id2;
      await axios.get(url).then((response) => {
        if (response && response.data) {
          setMessages(response.data);
          setLoadingChat(false);
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const DeletePod = async (pod_id) => {
    const id = localStorage.getItem("_id");
    try {
      const url = "http://localhost:3001/api/user/deletepod/" + id + "/" + pod_id;
      await axios.put(url).then((response) => {
        if (response && response.data) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const Send = async (messages) => {
    try {
      const url = "http://localhost:3001/api/chat/send";
      await axios.post(url, {
        _id1: _id1,
        _id2: _id2,
        _id: uuidv4(),
        text: messages,
        createdAt: new Date(),
        user: {
          _id: _id1,
        },
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      Send(newMessage);
      setNewMessage("");
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Tutaj możesz dodać logikę przeszukiwania listy osób
    console.log("Szukaj:", searchQuery);
  };

  useEffect(() => {
    const intId = setInterval(() => {
      GetChat();
    }, 2000);
    return () => {
      clearInterval(intId);
    };
  }, [messages]);

  useEffect(() => {
    Setup();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
        <FallingLines color="deepskyblue" width="100" visible={true} ariaLabel="falling-lines-loading" />
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <div
          style={{
            flex: "0 0 100px",
            zIndex: 1,
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#B3B1B1",
          }}>
          {/* Navbar */}
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
                  <FaMessage style={{ color: "#2699c7", fontSize: "4vh" }} />
                </Nav.Link>
              </Nav.Item>
            </div>
          </Nav>
        </div>

        {/* Lewa sekcja i Navbar (2:8) */}
        <div style={{ flex: 2, display: "flex", flexDirection: "column", padding: "10px" }}>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <Form.Control
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Wyszukaj..."
              className="shadow"
              style={{ borderRadius: "20px", marginRight: "5px", flex: 1, height: "4vh", borderWidth: 0 }}
            />
            <button className="roundbutton" style={{ width: "40px", height: "40px", margin: 0 }} onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>

          {/* Lista osób */}
          <div style={{ overflowY: "scroll", marginTop: "10px", flex: 1 }}>
            {data.map((person) => {
              let select = false;
              return (
                <div
                  key={person._id}
                  onClick={() => {
                    setID2(person._id);
                    setName(person.firstname + " " + person.lastname);
                    setMessages([]);
                    setLoadingChat(true);
                    GetChat();
                  }}
                  style={
                    select
                      ? {
                          cursor: "pointer",
                          marginBottom: "5px",
                          backgroundColor: "grey",
                          borderRadius: "5px",
                          padding: "5px",
                        }
                      : { cursor: "pointer", marginBottom: "5px", borderRadius: "5px", padding: "5px" }
                  }>
                  <FaRegUserCircle size={40} style={{ marginRight: "15px" }} />
                  <Form.Text>{person.firstname + " " + person.lastname}</Form.Text>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="roundbutton" style={{ width: "40px", height: "40px", margin: 0 }} onClick={toggleModal}>
              <FaList />
            </button>
          </div>
          <Modal show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Title style={{ display: "flex", justifyContent: "center" }}>Usuwanie podopiecznego</Modal.Title>
            <Modal.Body style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
              {data.map((person) => {
                let select = false;
                return (
                  <div
                    key={person._id}
                    style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div
                      style={
                        select
                          ? {
                              marginBottom: "5px",
                              backgroundColor: "grey",
                              borderRadius: "5px",
                              padding: "5px",
                            }
                          : { marginBottom: "5px", borderRadius: "5px", padding: "5px" }
                      }>
                      <FaRegUserCircle size={40} style={{ marginRight: "15px" }} />
                      <Form.Text>{person.firstname + " " + person.lastname}</Form.Text>
                    </div>
                    <button
                      className="roundbutton"
                      style={{ width: "40px", height: "40px", margin: 0 }}
                      onClick={() => {
                        DeletePod(person._id);
                      }}>
                      <FaX />
                    </button>
                  </div>
                );
              })}
            </Modal.Body>
          </Modal>
        </div>

        {/* Prawa sekcja (3:7) */}
        {loadingChat ? (
          <div
            style={{
              flex: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <FallingLines color="deepskyblue" width="100" visible={true} ariaLabel="falling-lines-loading" />
          </div>
        ) : (
          <div style={{ flex: 8, borderRadius: "10px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, padding: 10 }}>{name}</div>
            <div
              style={{
                height: "400px",
                overflowY: "scroll",
                overflowX: "hidden",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "10px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  style={{
                    display: "flex",
                    textAlign: _id1 === msg.user._id ? "right" : "left",
                    borderRadius: "40px",
                    padding: "10px",
                    backgroundColor: _id1 === msg.user._id ? "#007AFF" : "#ccc",
                    color: _id1 === msg.user._id ? "white" : "black",
                    margin: _id1 === msg.user._id ? "0 0 5px auto " : "0 auto 5px 0",
                    maxWidth: "70%",
                  }}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                borderTop: "1px solid #ccc",
                borderRadius: "10px",
              }}>
              <Form.Control
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Wpisz wiadomość..."
                style={{ borderRadius: "20px", marginRight: "5px", padding: "5px", flex: 1 }}
              />
              <button
                onClick={handleSendMessage}
                className="roundbutton"
                style={{
                  borderRadius: "50%",
                  padding: "10px",
                  backgroundColor: "white",
                  width: "50px",
                  height: "50px",
                }}>
                <IoMdSend size={25} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Chat;
