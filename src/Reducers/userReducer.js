export const userLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        loading: true,
      };
    case "USER_LOGIN_SUCCESS":
      return {
        loading: false,
        userInfo: action.payload,
      };
    case "USER_LOGIN_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userRegisterReducers = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return {
        loading: true,
      };
    case "USER_REGISTER_SUCCESS":
      return {
        loading: false,
        userInfo: action.payload,
      };
    case "USER_REGISTER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userDetailReducers = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_DETAIL_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_DETAIL_SUCCESS":
      return {
        loading: false,
        user: action.payload,
      };
    case "USER_DETAIL_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "USER_DETAIL_RESET":
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const updateProfileReducers = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return {
        loading: true,
      };
    case "USER_UPDATE_SUCCESS":
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case "USER_UPDATE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "USER_LIST_REQUEST":
      return {
        loading: true,
      };
    case "USER_LIST_SUCCESS":
      return {
        loading: false,
        users: action.payload,
      };
    case "USER_LIST_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "USER_DETAIL_RESET":
      return {
        users: [],
      };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_DELETE_REQUEST":
      return {
        loading: true,
      };
    case "USER_DELETE_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "USER_DELETE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_ADMIN_UPDATE_REQUEST":
      return {
        loading: true,
      };
    case "USER_ADMIN_UPDATE_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "USER_ADMIN_UPDATE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "USER_ADMIN_UPDATE_RESET":
      return {
        user: {},
      };
    default:
      return state;
  }
};
