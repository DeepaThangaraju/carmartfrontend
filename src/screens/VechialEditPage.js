// import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import {
  vechicalDetailsAction,
  updateVechical,
} from "../action/vechicalAction";
import FormComponent from "../components/FormComponent";

export default function VechicalEditPage({ match, history }) {
  const vechicalId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [pic, setPic] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [milage, setMilage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  // const [upload, setUpload] = useState(false);

  const dispatch = useDispatch();

  const vechicalDetails = useSelector((state) => state.vechicalDetailsReducers);
  const { loading, error, vechical } = vechicalDetails;

  const vechicalUpdate = useSelector((state) => state.vechicalUpdateReducer);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = vechicalUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: "VECHICAL_UPDATE_RESET" });
      history.push("/admin/vechicals");
    } else {
      if (!vechical.name || vechical._id !== vechicalId) {
        dispatch(vechicalDetailsAction(vechicalId));
      } else {
        setName(vechical.name);
        setPrice(vechical.price);
        setPic(vechical.pic);
        setBrand(vechical.brand);
        setCategory(vechical.category);
        setCountInStock(vechical.countInStock);
        setMilage(vechical.milage);
        setDescription(vechical.description);
        setVideo(vechical.video);
      }
    }
  }, [vechical, dispatch, vechicalId, history, successUpdate]);

  // const uploadFilehandler = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("pic", file);
  //   setUpload(true);
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };
  //     const { data } = await axios.post("/api/upload", formData, config);
  //     setPic(data);
  //     setUpload(false);
  //   } catch (err) {
  //     console.error(err);
  //     setUpload(false);
  //   }
  // };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateVechical({
        _id: vechicalId,
        name,
        price,
        pic,
        video,
        brand,
        category,
        countInStock,
        milage,
        description,
      })
    );
  };
  return (
    <>
      <Link to="/admin/vechicals">
        <Button>Go Back</Button>
      </Link>
      <FormComponent>
        <h1>Edit Vechical</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && <Error variant="danger" error={error} />}
        {loading ? (
          <Loading />
        ) : error ? (
          <Error variant="danger" error={error} />
        ) : (
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

            <Form.Group controlId="price">
              <Form.Label>price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="pic">
              <Form.Label>Pic</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pic url"
                value={pic}
                onChange={(e) => setPic(e.target.value)}
              ></Form.Control>
              {/* <input type="file" name="myImage" onChange={uploadFilehandler} />

              {upload && <Loading />} */}
            </Form.Group>

            <Form.Group controlId="Video">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Video url"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="milage">
              <Form.Label>Milage</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter milage"
                value={milage}
                onChange={(e) => setMilage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormComponent>
    </>
  );
}
