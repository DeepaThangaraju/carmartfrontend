import React from "react";
import { Card, Container } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product({ vechical }) {
  return (
    <div>
        <Container>
      <Card style={{ width: "17rem" ,height:"22rem"}} className="m-3 p-3 rounded">
        <Link to={`/vechical/${vechical._id}`} >
          <Card.Img variant="top" src={vechical.pic} />
        </Link>
        <Card.Body>
        <Link to={`/vechical/${vechical._id}`}>
          <Card.Title as="div"><strong>{vechical.name}</strong></Card.Title>
        </Link>
          <Card.Text>
              <p>Category:{vechical.category}</p>
          </Card.Text>
          <Card.Text as="div">
             <Rating value={vechical.rating} />
          </Card.Text>
          <Card.Text as="h4">Rs.{vechical.price}Lakhs</Card.Text>
        </Card.Body>
      </Card>
      </Container>
    </div>
  );
}
