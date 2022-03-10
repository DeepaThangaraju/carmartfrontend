import React, { useEffect} from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { orderList } from "../action/orderAction";

export default function OrderListPage({history}) {
  const dispatch = useDispatch();
  const orderlist = useSelector(state => state.orderListReducer);
  const { loading, error, orders } =orderlist;

  const userLogin = useSelector(state => state.userLoginReducer);
  const {  userInfo } = userLogin;
  
  
  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
    dispatch(orderList());
    }else{
      history.push("/login")
    }
  }, [dispatch,history,userInfo]);

  return (
    <>
      <h2>Orders</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>
                  {order.createdAt.substring(0,10)}
                </td>
                <td>Rs.{order.totalPrice}</td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/orders/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
