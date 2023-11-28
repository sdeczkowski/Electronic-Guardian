import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import uni from '../assets/uni.png';
import "../styles/style.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async () => {
    // Your submission logic goes here
  };

  return (
    <div className="xd">
      <img src={uni} alt='logo' className="xd2" />
      <div className="xd3">
        <h5 className="title">Logowanie</h5>
        <br />
        <Form.Control
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="input"
          style={{width:"40%", borderRadius:"20vh"}}
        />
        <br />
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="input input-container"
          style={{width:"40%", borderRadius:"20vh"}}
        />
        <br />
        <div className="xd2 input input-container">
          <div>
            <button className="button1" onClick={handleSubmit}>
              Zaloguj się
            </button>
          </div>
          <Link to="/register" className="input input-container">
            Nie masz konta?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
