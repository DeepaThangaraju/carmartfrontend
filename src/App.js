import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./screens/Homepage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Orderpage from "./screens/Orderpage";
import Vechicalpage from "./screens/Vechicalpage";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/Registerpage";
import ProfilePage from "./screens/Profilepage";
import ShippingPage from "./screens/ShippingPage";
import Payment from "./components/Payment";
import PlaceOrderPage from "./screens/PlaceOrderPage";
import OrderDetailPage from "./screens/OrderDetailPage";
import UserListPage from "./screens/UserListPage";
import EditUser from "./screens/EditUser";
import VechicalListPage from "./screens/VechicalListPage";
import VechicalEditPage from "./screens/VechialEditPage";
import OrderListPage from "./screens/OrderListPage";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Container>
            <Route path="/" component={Homepage} exact />
            <Route path="/search/:keyword" component={Homepage} exact />
            <Route path="/page/:pageNumber" component={Homepage} exact />
            <Route path="/search/:keyword/page/:pageNumber" component={Homepage} exact />
            <Route path="/register" component={RegisterPage} />
            <Route path="/placeorder" component={PlaceOrderPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/orders/:id" component={OrderDetailPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/vechical/:id" component={Vechicalpage} />
            <Route path="/cart/:id?" component={Orderpage} />
            <Route path="/admin/userlist" component={UserListPage} />
            <Route path="/admin/orderlist" component={OrderListPage} />
            <Route path="/admin/users/:id/edit" component={EditUser} />
            <Route path="/admin/vechicals" component={VechicalListPage} exact/>
            <Route path="/admin/vechicals/:pageNumber" component={VechicalListPage} exact />
            <Route
              path="/admin/vechical/:id/edit"
              component={VechicalEditPage}
            />
            <Route path="/payment" component={Payment} />
          </Container>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
