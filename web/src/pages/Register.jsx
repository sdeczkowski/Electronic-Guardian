import React, { useState } from "react";
import "../styles/style.css"; // Import your custom styles if needed
import axios from "axios";

const Register = () => {
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordrepeat, setPasswordRepeat] = useState("");
  const type = "xd";

  const [check, setCheck] = useState(null);
  const [errFname, setErrFname] = useState(false);
  const [errLname, setErrLname] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errPhone, setErrPhone] = useState(false);
  const [errPass, setErrPass] = useState(false);
  const [errRPass, setErrRPass] = useState(false);

  const handleSignUp = async () => {
    setCheck(null);
    setErrFname(false);
    setErrLname(false);
    setErrEmail(false);
    setErrPhone(false);
    setErrPass(false);
    setErrRPass(false);
    const namesRegex = /^[a-z ,.'-]+$/i;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!namesRegex.test(firstname)) {
      setErrFname(true);
      setCheck("Niepoprawne imię!");
    } else if (!namesRegex.test(lastname)) {
      setErrLname(true);
      setCheck("Niepoprawne nazwisko!");
    } else if (!emailRegex.test(email)) {
      setErrEmail(true);
      setCheck("Niepoprawny email!");
    } else if (phone.length < 9) {
      setErrPhone(true);
      setCheck("Niepoprawny numer telefonu!");
    } else if (password === "") {
      setErrPass(true);
      setCheck("Wpisz hasło!");
    } else if (password !== passwordrepeat) {
      setErrPass(true);
      setErrRPass(true);
      setCheck("Hasła nie są identyczne!");
    } else {
      try {
        const url = "http://your-api-url/api/signup";
        await axios.post(url, {
          password: password,
          email: email,
          firstname: firstname,
          lastname: lastname,
          isActive: true,
          type: type,
          phoneNumber: phone,
        });
        //history.push("/login");
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          if (error.response.status === 409) {
            if (error.response.data.message === "Konto z podanym emailem już istnieje") {
              setErrEmail(true);
            } else {
              setErrPass(true);
              setErrRPass(true);
            }
            setCheck(error.response.data.message);
          }
        }
      }
    }
  };

  return (
    <div className=" register-container mojenieruszac">
      <img
        className="img"
        style={{ width: 150, height: 150 }}
        src={require("../../src/public/uni.png")}
        alt="Uni Logo"
      />
      <h1>Rejestracja</h1>
      <p style={{ color: "red" }}>{check}</p>
      <input
        className="textinput"
        style={errFname ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }}
        label="firstname"
        placeholder="Imię"
        placeholderTextColor="rgb(145, 145, 145)"
        value={firstname}
        onChange={(e) => setFirst(e.target.value)}
      />
      <input
        className="textinput"
        style={errLname ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }}
        label="lastname"
        placeholder="Nazwisko"
        placeholderTextColor="rgb(145, 145, 145)"
        value={lastname}
        onChange={(e) => setLast(e.target.value)}
      />
      <input
        className="textinput"
        style={errEmail ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }}
        label="email"
        placeholder="E-mail"
        placeholderTextColor="rgb(145, 145, 145)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="textinput"
        style={errPhone ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }}
        label="phone"
        placeholder="Numer tel."
        placeholderTextColor="rgb(145, 145, 145)"
        maxLength={9}
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="textinput"
        style={errPass ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }}
        label="password"
        placeholder="Hasło"
        placeholderTextColor="rgb(145, 145, 145)"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="textinput"
        style={errRPass ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }}
        placeholder="Powtórz hasło"
        placeholderTextColor="rgb(145, 145, 145)"
        type="password"
        value={passwordrepeat}
        onChange={(e) => setPasswordRepeat(e.target.value)}
      />

      <button className="button2" onClick={handleSignUp}>
        Zarejestruj się
      </button>
    </div>
  );
};

export default Register;
