export const cartReducer = (state = { cartItems: [],shippingAddress:{} }, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const item = action.payload;
      const itemExist = state.cartItems.find(
        (x) => x.vechical === item.vechical
      )
      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.vechical === itemExist.vechical ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
      case "CART_REMOVE_ITEM":
        return {
          ...state,
          cartItems: state.cartItems.filter((item)=>item.vechical !== action.payload)
        }
        case "CART_SAVE_ADDRESS":
        return {
          ...state,
          shippingAddress: action.payload
        }
        case "CART_SAVE_PAYMENT_METHOD":
        return {
          ...state,
          paymentMethod: action.payload
        }
    default:
      return state;
  }
};
