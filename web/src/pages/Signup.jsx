import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import uni from '../assets/uni.png';
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  const handleSubmit = async () => {
    
  };
  return (
    <div className="xd">
        <img src={uni} alt='logo' className="xd2"/>
        <div className="xd3">
          <h5 className="title">Logowanie</h5>
          <br />
          <Form.Control  type="text" placeholder="Large text" className="input"/>
          <br />
          <Form.Control type="text" placeholder="Normal text" className="input"/>
          <br />
          <button className="button1">Zaloguj się</button>
        </div>
    </div>
  );
}

export default Signup;
