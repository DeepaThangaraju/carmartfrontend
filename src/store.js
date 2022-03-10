import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  vechicalReducers,
  vechicalDetailsReducers,
  vechicalDeleteReducer,
  vechicalCreateReducer,
  vechicalUpdateReducer,
  vechicalCreateReviewReducer,topVechicalReducer
} from "./Reducers/vechicalReducers";
import { cartReducer } from "./Reducers/cartReducer";
import {
  orderItemReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListReducer,
  orderDeliverReducer
} from "./Reducers/orderReducer";
import {
  userDetailReducers,
  userListReducer,
  userLoginReducers,
  userRegisterReducers,
  updateProfileReducers,
  userDeleteReducer,
  userUpdateReducer
} from "./Reducers/userReducer";

const reducer = combineReducers({
  vechicalReducers: vechicalReducers,
  vechicalDetailsReducers: vechicalDetailsReducers,
  vechicalDeleteReducer:vechicalDeleteReducer,
  vechicalCreateReducer:vechicalCreateReducer,
  vechicalUpdateReducer:vechicalUpdateReducer,
  vechicalCreateReviewReducer: vechicalCreateReviewReducer,
  cartReducer: cartReducer,
  userLoginReducer: userLoginReducers,
  userRegisterReducer: userRegisterReducers,
  userDetailReducer: userDetailReducers,
  updateProfileReducer: updateProfileReducers,
  orderItemReducer: orderItemReducer,
  orderDetailsReducer: orderDetailsReducer,
  orderPayReducer: orderPayReducer,
  userListReducer: userListReducer,
  userDeleteReducer: userDeleteReducer,
  userUpdateReducer: userUpdateReducer,
  orderListReducer:orderListReducer,
  orderDeliverReducer:orderDeliverReducer,
  topVechicalReducer:topVechicalReducer
});

const itemsInStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoInStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressInStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cartReducer: {
    cartItems: itemsInStorage,
    shippingAddress: shippingAddressInStorage,
  },
  userLoginReducer: { userInfo: userInfoInStorage },
};
const middleware = [thunk];

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
