import axios from "axios";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`api/vechicals/${id}`);
  
  dispatch({
   
    type: "CART_ADD_ITEM",
    payload: {
      vechical: data._id,
      name: data.name,
      pic: data.pic,
      price: (data.price*100000).toFixed(0),
      countInStock: data.countInStock,
      quantity,
    },
  });
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const removeFromCart=(id)=>(dispatch,getState)=>{
 dispatch({
   type:"CART_REMOVE_ITEM",
   payload:id
 })

 localStorage.setItem('cartItems',JSON.stringify(getState().cartReducer.cartItems))
}

export const saveShippingAddress=(data)=>(dispatch,getState)=>{
  dispatch({
    type:"CART_SAVE_ADDRESS",
    payload:data
  })
 
  localStorage.setItem('shippingAddress',JSON.stringify(data))
 }
 
 export const savePaymentMethod=(data)=>(dispatch,getState)=>{
  dispatch({
    type:"CART_SAVE_PAYMENT_METHOD",
    payload:data
  })
 
  localStorage.setItem('paymentMethod',JSON.stringify(data))
 }
 

