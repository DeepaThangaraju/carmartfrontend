import React from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vechicalAction } from "../action/vechicalAction";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import Paginate from "../components/Paginate";
// import VechicalCarousel from "../components/VechicalCarousel";

export default function Homepage({ match }) {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const vechicalState = useSelector((state) => state.vechicalReducers);
  const { loading, error, vechicals, page, pages } = vechicalState;

  useEffect(() => {
    dispatch(vechicalAction(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      {/* {! keyword && <VechicalCarousel/>} */}
      {loading ? (
        <Loading />
      ) : error ? (
        <Error variant="danger" />
      ) : (
        <>
          <Row>
            {vechicals.map((vechical) => {
              return (
                <Col key={vechical._id} sm={12} md={6} lg={4} xl={3}>
                  <Product vechical={vechical} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
}
