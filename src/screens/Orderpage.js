import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  ListGroup,
  Card,
} from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { addToCart,removeFromCart } from "../action/cardAction";

export default function Orderpage({ match, location, history }) {
  const vechicalId = match.params.id;
  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart;
  console.log(cartItems);
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (vechicalId) {
      dispatch(addToCart(vechicalId, quantity));
    }
  }, [dispatch, vechicalId, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };
  const checkOutHandler=()=>{
    history.push('/login?redirect=shipping')
  }
  // console.log(quantity);
  return (
    <div>
      <Row>
        <Col md={9} ml={10}>
          <h3>Ordered Car</h3>
          {cartItems.length === 0 ? (
            <Alert variant="danger">
              Order not yet placed <Link to="/">Go Back</Link>
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item.vechical}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={item.pic}
                          alt={item.name}
                          fluid
                          rounded
                        ></Image>
                      </Col>
                      <Col md={2}>
                        <Link to={`/vechical/${item.vechical}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={3}>Rs.{item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.vechical, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => {
                            return (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                      <Col md={3}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => {
                            removeFromCartHandler(item.vechical);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={3} ml={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>
                  Total Item(
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                  items
                </h4>
                Rs.
                {cartItems.reduce(
                  (amt, item) => amt + item.quantity * item.price,0
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                  style={{width:"100%"}}
                >
                  Pay Now
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
