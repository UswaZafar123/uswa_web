const initialState = {
  loading: false,
  userInfo: null, // Default to null if no user in localStorage
  error: null,
};

// User Reducer
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: action.payload };
    
    case "USER_LOGIN_SUCCESS":
      return { ...state, userInfo: action.payload, loading: false };
    
    case "USER_LOGIN_FAIL":
      return { ...state, error: action.payload, loading: false };
    
    case "USER_REGISTER_SUCCESS":
      return { ...state, userInfo: action.payload, loading: false };
    
    case "USER_REGISTER_FAIL":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
