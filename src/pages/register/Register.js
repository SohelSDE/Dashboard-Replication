// Register.js
import React, { useState, useCallback } from "react";

import { NavLink } from "react-router-dom";
import {
  Container,
  Alert,
  Button,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
  Label,
} from "reactstrap";

import Widget from "../../components/Widget";
import { registerUser, registerError } from "../../actions/register";
// import microsoft from '../../assets/microsoft.png';

const Register = ({ dispatch, isFetching, errorMessage, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const changePassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const changeConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value);
  }, []);

  const isPasswordValid = useCallback(() => {
    return password && password === confirmPassword;
  }, [password, confirmPassword]);

  const checkPassword = useCallback(() => {
    if (!isPasswordValid()) {
      if (!password) {
        dispatch(registerError("Password field is empty"));
      } else {
        dispatch(registerError("Passwords are not equal"));
      }
      setTimeout(() => {
        dispatch(registerError());
      }, 3 * 1000);
    }
  }, [isPasswordValid, password, dispatch]);

  const doRegister = useCallback(
    (e) => {
      e.preventDefault();
      if (!isPasswordValid()) {
        checkPassword();
      } else {
        dispatch(
          registerUser({
            creds: {
              email: email,
              password: password,
            },
            history: history,
          })
        );
      }
    },
    [isPasswordValid, checkPassword, dispatch, email, password, history]
  );

  // useEffect(() => {
  // }, []);

  return (
    <div className="auth-page">
      <Container>
        <Widget
          className="widget-auth mx-auto"
          title={<h3 className="mt-0">Register for your Web App</h3>}
        >
          <p className="widget-auth-info">Please fill all fields below.</p>
          <form onSubmit={doRegister}>
            {errorMessage && (
              <Alert
                className="alert-sm widget-middle-overflow rounded-0"
                color="danger"
              >
                {errorMessage}
              </Alert>
            )}
            <FormGroup className="mt">
              <Label for="email">Email</Label>
              <InputGroup className="input-group-no-border">
                <InputGroupText addonType="prepend">
                  <InputGroupText>
                    <i className="la la-user text-white" />
                  </InputGroupText>
                </InputGroupText>
                <Input
                  id="email"
                  className="input-transparent pl-3"
                  value={email}
                  onChange={changeEmail}
                  type="email"
                  required
                  name="email"
                  placeholder="Email"
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <InputGroup className="input-group-no-border">
                <InputGroupText addonType="prepend">
                  <InputGroupText>
                    <i className="la la-lock text-white" />
                  </InputGroupText>
                </InputGroupText>
                <Input
                  id="password"
                  className="input-transparent pl-3"
                  value={password}
                  onChange={changePassword}
                  type="password"
                  required
                  name="password"
                  placeholder="Password"
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm</Label>
              <InputGroup className="input-group-no-border">
                <InputGroupText addonType="prepend">
                  <InputGroupText>
                    <i className="la la-lock text-white" />
                  </InputGroupText>
                </InputGroupText>
                <Input
                  id="confirmPassword"
                  className="input-transparent pl-3"
                  value={confirmPassword}
                  onChange={changeConfirmPassword}
                  onBlur={checkPassword}
                  type="password"
                  required
                  name="confirmPassword"
                  placeholder="Confirm"
                />
              </InputGroup>
            </FormGroup>
            <div className="bg-widget-transparent auth-widget-footer">
              <Button
                type="submit"
                color="danger"
                className="auth-btn"
                size="sm"
                style={{ color: "#fff" }}
              >
                {isFetching ? "Loading..." : "Register"}
              </Button>
              <p className="widget-auth-info mt-4">
                Already have an account? Login now!
              </p>
              <NavLink className="d-block text-center mb-4" to="/login">
                Enter the account
              </NavLink>
            </div>
          </form>
        </Widget>
      </Container>
      <footer className="auth-footer">
        {new Date().getFullYear()} &copy; Light Blue Template - React Admin
        Dashboard Template Made by{" "}
        <a
          href="https://github.com/SohelSDE"
          rel="noopener noreferrer"
          target="_blank"
        >
          Flatlogic LLC
        </a>
        .
      </footer>
    </div>
  );
};

export default Register;
