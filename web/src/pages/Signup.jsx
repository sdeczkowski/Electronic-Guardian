import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Particles from "../components/ParticleBackground";
import "./css/Signup.css";
import axios from "axios";

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
    <Container>
      <Row className="d-flex justify-content-center">
        <Row className="signup__top justify-content-center">
          <Col md={6} className="d-flex aligin-items-center justify-content-center flex-column">
            
            <Form onSubmit={handleSubmit}>
              <h1 className="text-center text-light">Create account</h1>
              <Form.Group className="mb-3 text-light" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                
                <Form.Control
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                  className="shadow p-3 mb-3 bg-white rounded"
                />
              </Form.Group>
              <Form.Group className="mb-3 text-light" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  value={data.email}
                  className="shadow p-3 mb-3 bg-white rounded"
                />
                <Form.Text className="text-muted ">We'll never share your email with anyone else.</Form.Text>
              </Form.Group>

              <Form.Group className="mb-4 text-light" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  className="shadow p-3 mb-4 bg-white rounded"
                />
              </Form.Group>
              <Button variant='info' type="submit" className="shadow p-3 mb-5 rounded">
                Create account
              </Button>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="py-4">
                <p className="text-center text-light">
                  Already have an account? <Link to="/Login">Login</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Row>
      <Particles />
      
    </Container>
  );
}

export default Signup;
