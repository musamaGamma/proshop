import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Row,Col, Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {register} from '../actions/userActions'
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterScreen = ({location, history}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch()
  const {loading, error, userInfo} = useSelector(state => state.userRegister)
const redirect = location.search ? location.search.split("=")[1] : "/"
  const submitHandler = e => {
    e.preventDefault()
    if(password !== confirmPassword) {
        setMessage("Passwords do not match")
    }
    else {
        dispatch(register(name, email, password))
    }
    
  }

  useEffect(() => {
    if(userInfo) {
        history.push(redirect)
    }
     
  }, [userInfo, history, redirect]);
  
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      {message && <Message msg={message} variant="danger" />}
      {error && <Message msg={error} variant="danger" />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="name">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="Name"
            required
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Register</Button>
      </Form>
      <Row className="py-3">
          <Col>
          New Customer?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
              Login
          </Link>
          </Col>

      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
