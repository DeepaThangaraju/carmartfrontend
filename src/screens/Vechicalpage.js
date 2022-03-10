import React from "react";
import { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  vechicalDetailsAction,
  createVechicalReview,
} from "../action/vechicalAction";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

export default function Vechicalpage({ history, match }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const detailsState = useSelector((state) => state.vechicalDetailsReducers);
  const { loading, error, vechical } = detailsState;

  const userLogin = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLogin;

  const createReview = useSelector(
    (state) => state.vechicalCreateReviewReducer
  );
  const { success: successVechicalReview, error: errorVechicalReview } =
    createReview;

  useEffect(() => {
    if(successVechicalReview){
      alert('Review Submitted')
      setRating(0)
      setComment("")
      dispatch({type:'VECHICAL_CREATE_REVIEW_RESET'})
    }
    dispatch(vechicalDetailsAction(match.params.id));
  }, [dispatch, match,successVechicalReview]);
  const submitHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`);
  };
  const submitReviewHandler=(e)=>{
     e.preventDefault();
     dispatch(createVechicalReview(match.params.id,{rating,comment}))
  }
  return (
    <div>
      <Container className="m-auto">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error variant="danger">{error}</Error>
        ) : (
          <>
            <Row>
              <Col md={12}>
                <iframe
                  className="py-3"
                  width="90%"
                  height="400"
                  src={vechical.video}
                  title={vechical.name}
                ></iframe>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{vechical.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>Category:{vechical.category}</ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={vechical.rating} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price:Rs.{vechical.price}lakhs
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description:{vechical.description}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Status:{" "}
                        {vechical.countInStock > 0
                          ? "In Stock"
                          : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {vechical.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(vechical.countInStock).keys()].map(
                              (x) => {
                                return (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                );
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={submitHandler}
                      className="btn-block ms-auto"
                      type="button"
                      disabled={vechical.countInStock === 0}
                    >
                      Order
                    </Button>
                    <Link
                      className="btn btn-dark mx-3"
                      to="/"
                      style={{ marginTop: "1rem" }}
                    >
                      Go Back
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {vechical.reviews && vechical.reviews.length === 0 && (
                  <Error error="No reviews" />
                )}
                <ListGroup>
                  {vechical.reviews &&
                    vechical.reviews.length > 0 &&
                    vechical.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />

                        {review.createdAt && review.createdAt.substr(0, 10)}

                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                  <ListGroup.Item>
                    <h2>Write a customer Review</h2>
                    {errorVechicalReview && <Error variant='danger' error={errorVechicalReview}/>}
                    {userInfo ? (
                      <Form onSubmit={submitReviewHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">select...</option>
                            <option value="1">1-poor</option>
                            <option value="2">2-fair</option>
                            <option value="3">3-Good</option>
                            <option value="4">4-Very Good</option>
                            <option value="5">5-Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                           <Form.Label>Comment</Form.Label>
                           <Form.Control as='textarea'
                           row='3'
                           value={comment}
                           onChange={(e)=>setComment(e.target.value)}
                        
                           ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                          submit
                        </Button>
                        
                      </Form>
                    ) : (
                      <>
                        <Error error="please sign in"></Error>
                        <Link to="/login">LogIn</Link>
                      </>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
