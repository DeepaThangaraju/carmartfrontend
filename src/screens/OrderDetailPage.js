import React, { useEffect , useState} from "react";
import axios from "axios";
import {PayPalButton} from 'react-paypal-button-v2';
import {  Row, Col, ListGroup, Image,Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { orderDetails,payOrder,deliverOrder } from "../action/orderAction";

export default function OrderDetailPage({ match,history }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const [readySdk,setReadySdk]=useState(false)

  const orderDetailState = useSelector((state) => state.orderDetailsReducer);
  const { order, loading, error } = orderDetailState;

  const orderPayState = useSelector((state) => state.orderPayReducer);
  const { loading:loadingPay, success:successPay } = orderPayState;

  const userLogin = useSelector(state => state.userLoginReducer);
  const {  userInfo } = userLogin;

  const orderDeliverState = useSelector((state) => state.orderDeliverReducer);
  const { loading:loadingDeliver, success:successDeliver } = orderDeliverState;


  if (!loading) {
    order.itemPrice = order.orderItem.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  useEffect(() => {
    if(!userInfo){
      history.push("/login")
    }
    const addPaypalScript=async ()=>{
       const {data:clientId}=await axios.get("/api/config/paypal")
       const script=document.createElement('script');
       script.type="text/javascript"
       script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
       script.async=true
       script.onload=()=>{
         setReadySdk(true)
       }
       document.body.appendChild(script)
    }
    if(!order || successPay || successDeliver){
      dispatch({type:"ORDER_PAY_RESET"})
      dispatch({type:"ORDER_DELIVER_RESET"})
    dispatch(orderDetails(orderId));
    }else if(!order.isPaid){
      if(!window.paypal){
        addPaypalScript();
      }else{
        setReadySdk(true)
      }
    }
  }, [dispatch,orderId,successPay,order,successDeliver,history,userInfo]);

  const paymentSuccessHandler=(paymentResult)=>{
    console.log(paymentResult)
    dispatch(payOrder(orderId,paymentResult))
  }
  const deliverHandler=()=>{
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loading />
  ) : error ? (
    <Error variant="danger" error={error} />
  ) : (
    <>
      <h2>Order {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto ${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalcode},
                {order.shippingAddress.states},{order.shippingAddress.country}
              </p>
              {order.isDelivered ? <Error variant="success" error={`Delivered on ${order.deliveredAt}`}/> 
                : <Error variant="danger" error="Not Delivered"></Error>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {/* {!order.isPaid ? (
                <Error variant="success" error={`Paid `} />//on ${order.paidAt}
              ) : (
                <Error variant="danger" error="Not paid"></Error>
              )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Ordered Car</h2>
              {order.orderItem.length === 0 ? (
                <Error error="Not yet ordered"></Error>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItem.map((item, index) => {
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
          <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>Order Details</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Car</Col>
                <Col>Rs.{order.itemPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>Rs.{order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>Rs.{order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>Rs.{order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loading/>}
                {!readySdk ? <Loading/>:(
                  <PayPalButton amount={order.totalPrice} onSuccess={paymentSuccessHandler}>

                  </PayPalButton>
                )}
              </ListGroup.Item>
            )}
            {loadingDeliver && <Loading />}
            {userInfo && userInfo.isAdmin && !order.isPaid && !order.isDelivered && (
              <ListGroup.Item>
                    <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                        Mark as Delivered
                    </Button>
                </ListGroup.Item>
            )}
          </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
