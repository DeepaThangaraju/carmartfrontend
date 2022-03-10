import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Error } from "../components/Error";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../action/orderAction";

export default function PlaceOrderPage({ history }) {
  const cart = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  cart.itemPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  cart.shippingPrice = cart.itemPrice < 500000 ? 1000 : 5000;

  cart.taxPrice = 0.1 * cart.itemPrice;

  cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;

  const orderState = useSelector((state) => state.orderItemReducer);
  const { order, success, error } = orderState;

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    }
    //eslint-disable-next-line
  }, [history, success]);
  const orderHandler = () => {
    dispatch(
      createOrder({
        orderItem: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Address</strong>
              <p>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalcode},{cart.shippingAddress.states},
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Ordered Car</h2>
              {cart.cartItems.length === 0 ? (
                <Error error="Not yet ordered"></Error>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.pic}
                              alt={item.name}
                              fluid
                              rounded
                            ></Image>
                          </Col>
                          <Col>
                            <Link to={`/vechical/${item.vechical}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={5}>
                            {item.quantity} * {item.price} = Rs.
                            {item.quantity * item.price}/-
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Order Details</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Car</Col>
                <Col>Rs.{cart.itemPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>Rs.{cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>Rs.{cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>Rs.{cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              {error && <Error variant="danger" error={error}></Error>}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disables={cart.cartItems.length === 0}
                onClick={orderHandler}
                style={{ width: "100%" }}
              >
                Order Now
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
