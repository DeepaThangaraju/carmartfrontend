import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormComponent from "../components/FormComponent";
import { saveShippingAddress } from "../action/cardAction";
import  CheckoutSteps  from "../components/CheckoutSteps";

export default function ShippingPage({ history }) {
  const cart=useSelector((state)=>state.cartReducer)
  const {shippingAddress}=cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
  const [states, setStates] = useState(shippingAddress.states);
  const [country,setCountry]=useState(shippingAddress.country);

  const dispatch=useDispatch();

  const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(saveShippingAddress({address,city,postalcode,states,country}));
      history.push("/payment")
  }

  return (
    <FormComponent>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalcode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postalcode"
            value={postalcode}
            onChange={(e) => setPostalcode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="states">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter state"
            value={states}
            onChange={(e) => setStates(e.target.value)}
          ></Form.Control>
          </Form.Group>



        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">Continue</Button>

        
      </Form>
    </FormComponent>
  );
}
