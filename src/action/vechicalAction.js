import axios from "axios";
export const vechicalAction = (keyword='',pageNumber='') => async (dispatch) => {
  try {
    dispatch({ type: "VECHICAL_LIST_REQUEST" });
    const { data } = await axios.get(`/api/vechicals?keyword=${keyword}&pageNumber=${pageNumber}`);
    dispatch({ type: "VECHICAL_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "VECHICAL_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const vechicalDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "VECHICAL_DETAIL_REQUEST" });
    const { data } = await axios.get(`/api/vechicals/${id}`);
    dispatch({ type: "VECHICAL_DETAIL_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "VECHICAL_DETAIL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteVechical = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "VECHICAL_DELETE_REQUEST" });
    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/vechicals/${id}`, config);

    dispatch({ type: "VECHICAL_DELETE_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "VECHICAL_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createVechical = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "VECHICAL_CREATE_REQUEST" });
    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/vechicals`, {}, config);

    dispatch({ type: "VECHICAL_CREATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "VECHICAL_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateVechical = (vechical) => async (dispatch, getState) => {
  try {
    dispatch({ type: "VECHICAL_UPDATE_REQUEST" });
    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/vechicals/${vechical._id}`,
      vechical,
      config
    );

    dispatch({ type: "VECHICAL_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "VECHICAL_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createVechicalReview =
  (vechicalId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: "VECHICAL_CREATE_REVIEW_REQUEST" });
      const {
        userLoginReducer: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/vechicals/${vechicalId}/reviews`, review, config);

      dispatch({ type: "VECHICAL_CREATE_REVIEW_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "VECHICAL_CREATE_REVIEW_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const topVechical = () => async (dispatch) => {
    try {
      dispatch({ type: "VECHICAL_TOP_REQUEST" });
      const { data } = await axios.get(`/api/vechicals/top`);
      dispatch({ type: "VECHICAL_TOP_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "VECHICAL_TOP_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };