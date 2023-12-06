import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import uni from "../assets/uni.png";
import "../styles/style.css";
import axios from "axios";

const Signup = () => {
  // zmienne
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // walidatory
  const [check, setCheck] = useState(null);
  const [errEmail, setErrEmail] = useState(false);
  const [errPass, setErrPass] = useState(false);

  const handleLogin = async () => {
    setCheck(null);
    setErrEmail(false);
    setErrPass(false);
    if (email === "") {
      setErrEmail(true);
      setCheck("Wpisz email!");
    } else if (password === "") {
      setErrPass(true);
      setCheck("Wpisz hasło!");
    } else {
      try {
        const url = "http://localhost:3001/api/auth";
        const { data: res } = await axios.post(url, {
          email: email,
          password: password,
          platform: "web"
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("_id", res.data._id);
        window.location.replace("/");
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          if (error.response.status === 400) {
            setErrEmail(true);
            setErrPass(true);
            setCheck("Niepoprawne dane");
          }
          if (error.response.status === 401) {
            if (error.response.data.message === "Błędny email") {
              setErrEmail(true);
            }
            if (error.response.data.message === "Błędne hasło") {
              setErrPass(true);
            }
            else {
              setErrEmail(true);
              setErrPass(true);
            }
            setCheck(error.response.data.message);
          }
        }
      }
    }
  };

  return (
    <div className="login">
      <img src={uni} alt="logo" className="img" />
      <h1 style={{ marginTop: "10px" }}>Logowanie</h1>
      <br />
      <p style={{ color: "red" }}>{check}</p>
      <form onSubmit={handleLogin} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Form.Control
        type="text"
        placeholder="Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        style={
          errEmail
            ? { borderColor: "red", borderWidth: 1, margin: "10px", width: "30vw", borderRadius: "20vh" }
            : { margin: "10px", width: "30vw", borderRadius: "20vh" }
        }
      />
      <Form.Control
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        className="input"
        style={
          errPass
            ? { borderColor: "red", borderWidth: 1, margin: "10px", width: "30vw", borderRadius: "20vh" }
            : { margin: "10px", width: "30vw", borderRadius: "20vh" }
        }
      />
      <button type="submit" className="button" style={{ backgroundColor: "deepskyblue" }}>
        Zaloguj się
      </button>
      </form>
      <Link to="/signup" className="">
        Nie masz konta?
      </Link>
    </div>
  );
};

export default Signup;
