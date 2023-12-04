import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import uni from "../assets/uni.png";
import "../styles/style.css";

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
    <div className="login">
      <img src={uni} alt="logo" className="img" />
      <h1 style={{marginTop: "10px"}}>Logowanie</h1>
      <Form.Control
        type="text"
        placeholder="Email"
        name="email"
        onChange={handleChange}
        className="input"
        style={{ margin: "10px", width: "30vw", borderRadius: "20vh" }}
      />
      <Form.Control
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        className="input"
        style={{ margin: "10px", width: "30vw", borderRadius: "20vh" }}
      />
      <button className="button" style={{ backgroundColor: "deepskyblue" }} onClick={handleSubmit}>
        Zaloguj się
      </button>
      <Link to="/signup" className="">
        Nie masz konta?
      </Link>
    </div>
  );
};

export default Signup;
