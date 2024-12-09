// src/Actions/UserActions.js
import axios from "axios";
import { message } from "antd";

// User Login Action
export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(
      "http://localhost:3001/api/users/login",
      reqObj
    );
alert(response);
    const data = response.data;
    console.log(data); // Log the data to check its structure
    
 const token = data.token;
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token);
      // Check if role is admin and redirect
      if (data.role === 'admin') {
        window.location.href = '/admin';
      }
      else if (data.role === 'customer'){
        window.location.href = '/customer';
      }
    

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.error(error.response); // Log the full error response for debugging
    alert("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};


// User Registration Action
export const userRegister = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
  
    try {
      const response = await axios.post(
        'http://localhost:3001/api/users/register',
        reqObj
      );
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data));  // Store user data if needed
      message.success('Registration successful');
      dispatch({ type: 'LOADING', payload: false });
      setTimeout(() => {
        window.location.href = '/login';  // Redirect to login page after successful registration
      }, 500);
    } catch (error) {
        message.error("helo g");
      console.log(error);
      alert(error);
      // Check if error.response exists and has the message key
      message.error(error.response?.data?.message || 'Something went wrong during registration');
      dispatch({ type: 'LOADING', payload: false });
    }
  };
