import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { getUserDetails,updateUser} from "../action/userAction";
import FormComponent from "../components/FormComponent";

export default function EditUser({ match, history }) {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetailReducer);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdateReducer);
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate;

  useEffect(() => {
      if(successUpdate){
          dispatch({type:"USER_ADMIN_UPDATE_RESET"})
          history.push('/admin/userlist')
      }else{
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
}
  }, [user,dispatch,userId,successUpdate,history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id:userId,name,email,isAdmin}))
  };
  return (
    <>
      <Link to="/admin/userlist">
        <Button>Go Back</Button>
      </Link>
      <FormComponent>
      <h1>Edit User</h1>
      {loadingUpdate && <Loading/>}
      {errorUpdate && <Error variant="danger" error={errorUpdate}/>}
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

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="Checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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
