import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import from react-redux
import { Form, Input, Button, Select, message, Spin } from "antd";
import { Link } from "react-router-dom";
import { userLogin } from "../Actions/UserActions"; // Action creator for login
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1a1a; /* Dark background */
  background-image: url('https://wallpapers.com/images/hd/4k-bmw-car-in-dark-c0ot64ri2fecu1pr.jpg'); /* Replace with your image */
  background-size: cover;
  background-position: center;
`;

const FormContainer = styled.div`
  width: 350px;
  background-color: rgba(33, 37, 41, 0.85);  /* Dark greyish background with some opacity */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);  /* Optional: Add shadow to the form for extra visibility */
  color: #fff;
  position: absolute;
  top: 25%;
  right: 10%;  /* Align the form container to the right */
  transform: translateY(-50%);  /* Vertically center the form */
  z-index: 2;
`;
const StyledInput = styled(Input)`
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  margin-bottom: 16px;
  &::placeholder {
    color: #bfbfbf;
  }
  &:hover{
    color: #333;
  }
`;

const StyledButton = styled(Button)`
  background-color: #1e90ff;
  border-color: #1e90ff;
  color: #fff;
  width: 100%;
  font-size: 16px;
  border-radius: 4px;
  margin-top: 16px;

  &:hover {
    background-color: #007bff;
    border-color: #007bff;
  }
`;

const StyledSelect = styled(Select)`
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 16px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const Login = () => {
  const dispatch = useDispatch();
  const { loading,userInfo,  error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");

  // Initialize AOS for animation
  React.useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleLogin = () => {
    if (!email || !password || !role) {
      message.error("Please fill in all fields");
      return;
    }
    const reqObj = { email, password, role };
    dispatch(userLogin(reqObj)); // Dispatch login action
  };

  return (
    <LoginContainer>
      <FormContainer data-aos="fade-up">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        {error && <ErrorText>{error}</ErrorText>}
        <Form >
          <Form.Item>
            <StyledInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item>
            <StyledInput.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item>
            <StyledSelect
              value={role}
              onChange={(value) => setRole(value)}
              disabled={loading}
            >
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="customer">Customer</Select.Option>
              <Select.Option value="carowner">Car Owner</Select.Option>
            </StyledSelect>
          </Form.Item>
          <Form.Item>
            <StyledButton
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={handleLogin}
            >
              {loading ? <Spin /> : "Login"}
            </StyledButton>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <span style={{ color: "#bbb" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#1e90ff" }}>
              Register here
            </Link>
          </span>
        </div>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
