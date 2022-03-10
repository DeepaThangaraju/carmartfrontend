import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../action/userAction";
import { Route } from "react-router-dom";
import SearchBox from "./SearchBox";

export default function Header() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.userLoginReducer);
  const { userInfo } = login;
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="menu">
      <Navbar bg="dark" variant="dark" expand="lg" collapseonselect="true">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://cdn.worldvectorlogo.com/logos/hyundai-motor-company-2.svg"
              alt="Hyundai"
            />
            Car Mart
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ms-auto">
              <Nav.Link href="/cart">
                <i className="fas fa-car"></i>Car-Order
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <Nav.Link href="/profile">
                    <span style={{ color: "black", marginLeft: "0.5rem" }}>
                      Profile
                    </span>
                  </Nav.Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <span style={{ color: "black" }}>LogOut</span>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">
                  <i className="fas fa-user"></i>Login
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <Nav.Link href="/admin/userlist">
                    <span style={{ color: "black", marginLeft: "0.5rem" }}>
                      Users
                    </span>
                  </Nav.Link>
                  <Nav.Link href="/admin/vechicals">
                    <span style={{ color: "black", marginLeft: "0.5rem" }}>
                      Vechicals
                    </span>
                  </Nav.Link>
                  <Nav.Link href="/admin/orderlist">
                    <span style={{ color: "black", marginLeft: "0.5rem" }}>
                      Orders
                    </span>
                  </Nav.Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
