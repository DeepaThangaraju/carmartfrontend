import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { userLogin } from "../action/userAction";
import FormComponent from "../components/FormComponent";

export default function LoginPage({location,history}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch();

  const login=useSelector((state)=>state.userLoginReducer);
  const {loading,error,userInfo}=login;
  const redirect=location.search ? location.search.split("=")[1] :'/';
  useEffect(()=>{
   
    if(userInfo){
    history.push(redirect)
    }
  },[history,redirect,userInfo])
  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(userLogin(email,password))
  }
  return (
    <FormComponent>
      <h1>Sign In</h1>
      {error && <Error variant="danger" error={error}></Error>}
      {loading && <Loading/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Sign In</Button>
      </Form>
      <Row className="py-3">
        <Col>
         New to CarMart?<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormComponent>
  );
}
