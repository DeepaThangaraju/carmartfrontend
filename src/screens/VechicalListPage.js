import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import Paginate from "../components/Paginate";
import {
  vechicalAction,
  deleteVechical,
  createVechical,
} from "../action/vechicalAction";

export default function VechicalListPage({ history, match }) {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const vechicallist = useSelector((state) => state.vechicalReducers);
  const { loading, error, vechicals, page, pages } = vechicallist;

  const deletevechical = useSelector((state) => state.vechicalDeleteReducer);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deletevechical;

  const createvechical = useSelector((state) => state.vechicalCreateReducer);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    vechical: createdvechical,
  } = createvechical;
  console.log(createdvechical);

  console.log(vechicals);

  const userLogin = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: "VECHICAL_CREATE_RESET" });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/vechical/${createdvechical._id}/edit`);
    } else {
      dispatch(vechicalAction("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdvechical,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteVechical(id));
    }
  };

  const createVechicalHandler = (vechical) => {
    dispatch(createVechical());
  };
  return (
    <>
      <Row className="allign-item-center">
        <Col>
          <h1>Vechical</h1>
        </Col>
        <Col className="allign-item-right">
          <Button
            className="my-3"
            style={{ marginLeft: "50%" }}
            onClick={createVechicalHandler}
          >
            <i className="fas fa-plus">Add Vechical</i>
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loading />}
      {errorDelete && <Error variant="danger" error={errorDelete} />}
      {loadingCreate && <Loading />}
      {errorCreate && <Error variant="danger" error={errorCreate} />}
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE(in lakhs)</th>
                <th>CATOGARY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vechicals.map((vechical) => (
                <tr key={vechical._id}>
                  <td>{vechical._id}</td>
                  <td>{vechical.name}</td>
                  <td>Rs.{vechical.price}</td>
                  <td>{vechical.category}</td>
                  <td>{vechical.brand}</td>
                  <td>
                    <Link to={`/admin/vechical/${vechical._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      className="danger btn-sm"
                      onClick={() => deleteHandler(vechical._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true}/>
        </>
      )}
    </>
  );
}
