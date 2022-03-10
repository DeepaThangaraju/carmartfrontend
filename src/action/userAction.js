import axios from "axios";

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "https://carmartapp.herokuapp.com/api/users/login",
      { email, password },
      config
    );
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout=()=>(dispatch)=>{
  localStorage.removeItem('userInfo')
  dispatch({type:"USER_LOGOUT"})
  dispatch({type:"USER_DETAIL_RESET"})
  dispatch({type:"USER_LIST_RESET"})
}

export const Register = (name,email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name,email, password },
      config
    );
    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data,
    });
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getUserDetails = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: "USER_DETAIL_REQUEST" });

    const {userLoginReducer:{userInfo}}=getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${userInfo.token}`
      },
    };
    const { data } = await axios.get(
      `/api/users/${id}`,
      config
    );
    dispatch({
      type: "USER_DETAIL_SUCCESS",
      payload: data,
    });
   
  } catch (error) {
    dispatch({
      type: "USER_DETAIL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile = (user) => async (dispatch,getState) => {
  try {
    dispatch({ type: "USER_UPDATE_REQUEST" });

    const {userLoginReducer:{userInfo}}=getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${userInfo.token}`
      },
    };
    const { data } = await axios.put(
      `/api/users/profile`,
      user,
      config
    );
    dispatch({
      type: "USER_UPDATE_SUCCESS",
      payload: data,
    });
   
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch,getState) => {
  try {
    dispatch({ type: "USER_LIST_REQUEST" });

    const {userLoginReducer:{userInfo}}=getState()
    const config = {
      headers: {
        Authorization:`Bearer ${userInfo.token}`
      },
    };
    const { data } = await axios.get(
      `/api/users`,
      config
    );
    dispatch({
      type: "USER_LIST_SUCCESS",
      payload: data,
    });
   
  } catch (error) {
    dispatch({
      type: "USER_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: "USER_DELETE_REQUEST" });

    const {userLoginReducer:{userInfo}}=getState()
    const config = {
      headers: {
        Authorization:`Bearer ${userInfo.token}`
      },
    };
    await axios.delete(
      `/api/users/${id}`,
      config
    );
    dispatch({
      type: "USER_DELETE_SUCCESS",
      success:true
    });
   
  } catch (error) {
    dispatch({
      type: "USER_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch,getState) => {
  try {
    dispatch({ type: "USER_ADMIN_UPDATE_REQUEST" });

    const {userLoginReducer:{userInfo}}=getState()
    const config = {
      headers: {
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      },
    };
    const {data}=await axios.put(
      `/api/users/${user._id}`,
      user,
      config
    );
    dispatch({type:"USER_ADMIN_UPDATE_SUCCESS"})
    dispatch({
      type: "USER_DETAIL_SUCCESS",
      payload:data
    });
   
  } catch (error) {
    dispatch({
      type: "USER_ADMIN_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};