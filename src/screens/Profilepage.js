import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { getUserDetails,updateProfile } from "../action/userAction";


export default function ProfilePage({location,history}) {
    const [name,setName]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimpassword, setConfrimpassword] = useState("");
  const [message,setMessage]=useState(null);

  const dispatch=useDispatch();

  const details=useSelector((state)=>state.userDetailReducer);
  const {loading,error,user}=details;

  const userLogin=useSelector((state)=>state.userLoginReducer);
  const {userInfo}=userLogin

  const profileUpdate=useSelector((state)=>state.updateProfileReducer);
  const {success}=profileUpdate
  
  useEffect(()=>{
   
    if(!userInfo){
    history.push("/login")
    }else{
        if(!user.name){
           dispatch(getUserDetails('profile'))
        }else{
            setName(user.name)
            setEmail(user.email)

        }
    }
  },[dispatch,history,userInfo,user])
  const submitHandler=(e)=>{
    e.preventDefault()
    if(password!==confrimpassword){
        setMessage('Password do not match')
    }else{
       dispatch(updateProfile({id:user._id,name,email,password}))
    }
  }
  return (
   <Row className="justify-content-center">
       <Col >
       <h2>User Profile</h2>
      {message && <Error variant="danger" error={message}></Error>}
      {error && <Error variant="danger" error={error}></Error>}
      {success && <Error variant="success" error="Profile updated Successfully"></Error>}
      {loading && <Loading/>}
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

          <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Confrim Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confrim password"
            value={confrimpassword}
            onChange={(e) => setConfrimpassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">Update</Button>

      </Form>

       </Col>
   </Row>
    
  );
}
