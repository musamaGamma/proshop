import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Row,Col, Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {login} from '../actions/userActions'
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginScreen = ({location, history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const {loading, error, userInfo} = useSelector(state => state.userLogin)
const redirect = location.search ? location.search.split("=")[1] : ""
console.log(redirect, location.search)
  const submitHandler = e => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  useEffect(() => {
    if(userInfo) {
        history.push(redirect)
    }
     
  }, [userInfo, history, redirect]);
  
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loading && <Loader />}
      {error && <Message msg={error} variant="danger" />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Sign In</Button>
      </Form>
      <Row className="py-3">
          <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
              Register
          </Link>
          </Col>

      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
