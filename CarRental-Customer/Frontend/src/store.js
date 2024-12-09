// src/store.js
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Correctly import 'thunk' as a named export
import rootReducer from "./Reducers/Root";  // Import rootReducer

const store = createStore(rootReducer, applyMiddleware(thunk));  // Apply thunk middleware

export default store;
