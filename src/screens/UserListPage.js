import React, { useEffect} from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { listUsers,deleteUser } from "../action/userAction";

export default function UserListPage({history}) {
  const dispatch = useDispatch();
  const userlist = useSelector(state => state.userListReducer);
  const { loading, error, users } = userlist;

  const userLogin = useSelector(state => state.userLoginReducer);
  const {  userInfo } = userLogin;

  const userDelete = useSelector(state => state.userDeleteReducer);
  const { success:successDelete } = userDelete;
  
  console.log(users);
  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
    dispatch(listUsers());
    }else{
      history.push("/login")
    }
  }, [dispatch,history,userInfo,successDelete]);

  const deleteHandler = (id) => {
    if(window.confirm("Are you sure")){
    dispatch(deleteUser(id))
  }
  };
  return (
    <>
      <h2>User list</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/users/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button
                    className="danger btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
