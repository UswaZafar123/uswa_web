// src/reducers/rootReducer.js
import { combineReducers } from "redux";
import { userReducer } from "./UserReducers";  // Import the user reducer

const rootReducer = combineReducers({
  user: userReducer,  // Combine userReducer with the user state
  // Add other reducers here as needed
});

export default rootReducer;
