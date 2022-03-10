import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { topVechical } from "../action/vechicalAction";
import { useDispatch, useSelector } from "react-redux";
export default function VechicalCarousel() {
  const dispatch = useDispatch();

  const topRatedVechical = useSelector((state) => state.topVechicalReducer);
  const { loading, error, vechicals } = topRatedVechical;

  console.log(vechicals);

  useEffect(() => {
    dispatch(topVechical());
  }, [dispatch]);
  return loading ? (
    <Loading />
  ) : error ? (
    <Error variant="danger" error={error}></Error>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {vechicals.map((vechical) => (
        <Carousel.Item key={vechical._id}>
          <Image src={vechical.pic} alt={vechical.name} fluid />
          <Carousel.Caption className="carousel-caption">
            <h2>
              {vechical.name}({vechical.price})
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
