import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { Register } from "../action/userAction";
import FormComponent from "../components/FormComponent";

export default function RegisterPage({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimpassword, setConfrimpassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const register = useSelector((state) => state.userRegisterReducer);
  const { loading, error, userInfo } = register;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confrimpassword) {
      setMessage("Password do not match");
    } else {
      dispatch(Register(name, email, password));
    }
  };
  return (
    <FormComponent>
      <h1>Sign Up</h1>
      {message && <Error variant="danger" error={message}></Error>}
      {error && <Error variant="danger" error={error}></Error>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Confrim Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confrim password"
            value={confrimpassword}
            onChange={(e) => setConfrimpassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account ?
          <Link to={redirect ? `/Login?redirect=${redirect}` : "/Login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormComponent>
  );
}
