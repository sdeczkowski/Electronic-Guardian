import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import uni from "../assets/uni.png";
import { FaMap, FaRegCircleUser, FaLocationDot, FaMessage } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Cześć, jak mogę Ci dzisiaj pomóc?",
      user: "React Native",
      isMe: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, user: "Me", isMe: true }]);
      setNewMessage("");
    }
  };

  const [conversations, setConversations] = useState([
    { id: 1, name: "Anna Nowak" },
    { id: 2, name: "Maria Maria" },
    // ... dodaj więcej osób
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Tutaj możesz dodać logikę przeszukiwania listy osób
    console.log("Szukaj:", searchQuery);
  };

  const handleNewConversation = () => {
    // Tutaj możesz dodać logikę tworzenia nowej konwersacji
    console.log("Utwórz nową konwersację");
  };

  return (
   <div style={{ display: "flex", height: "100vh" }}>
  <div style={{ flex: "0 0 100px", zIndex: 1, position: "sticky", top: 0, height: "100vh", overflowY: "auto" , backgroundColor:"#B3B1B1"}}>
    {/* Navbar */}
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

  {/* Lewa sekcja i Navbar (2:8) */}
  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", marginBottom: "10px" }}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Wyszukaj..."
        style={{ borderRadius: "20px", marginRight: "5px", flex: 1 }}
      />
      <button onClick={handleSearch} style={{ borderRadius: "50%", backgroundColor: "white", padding: "10px" }}>
        <FaSearch />
      </button>
    </div>

    {/* Lista osób */}
    <div style={{ overflowY: "scroll", marginTop: "10px", flex: 1 }}>
      {conversations.map((person) => (
        <div
          key={person.id}
          style={{ cursor: "pointer", marginBottom: "5px", borderRadius: "5px", padding: "5px" }}>
          <FaRegUserCircle style={{ marginRight: "5px" }} /> 
          {person.name}
        </div>
      ))}
    </div>
  </div>

  {/* Prawa sekcja (3:7) */}
  <div style={{ flex: 8, borderRadius: "10px", display: "flex", flexDirection: "column" }}>
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
          key={msg.id}
          style={{
            display: "flex",
            textAlign: msg.isMe ? "right" : "left",
            borderRadius: "40px",
            padding: "10px",
            backgroundColor: msg.isMe ? "#007AFF" : "#ccc",
            color: msg.isMe ? "white" : "black",
            border: "1px solid #007AFF",
            margin: msg.isMe ? "0 0 0 auto " : "0 auto 0 0",
            maxWidth: "70%",
          }}>
          <strong>{msg.user}:</strong> {msg.text}
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
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Wpisz wiadomość..."
        style={{ borderRadius: "20px", marginRight: "5px", padding: "5px", flex: 1 }}
      />
      <button
        onClick={handleSendMessage}
        style={{ borderRadius: "50%", padding: "10px", backgroundColor: "white" }}>
        <IoMdSend />
      </button>
    </div>
  </div>
</div>

  );
};

export default Chat;
