import React, { useState } from 'react';
import { Container, Alert, Button, FormGroup, Label, InputGroup, Input, InputGroupText } from 'reactstrap';
import Widget from '../../components/Widget';
import { loginUser } from '../../actions/user';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('admin@flatlogic.com');
  const [password, setPassword] = useState('password');
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const history = useNavigate();

  const doLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    console.log('Data',isFetching);
  };

  return (
    <div className="auth-page">
      <Container>
        <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Login to your Web App</h3>}>
          <p className="widget-auth-info">Use your email to sign in.</p>
          <form onSubmit={doLogin}>
            {errorMessage && (
              <Alert className="alert-sm widget-middle-overflow rounded-0" color="danger">
                {errorMessage}
              </Alert>
            )}
            <FormGroup className="mt">
              <Label for="email">Email</Label>
              <InputGroup className="input-group-no-border">
                <InputGroupText>
                  <i className="la la-user text-white" />
                </InputGroupText>
                <Input
                  id="email"
                  className="input-transparent pl-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <InputGroupText>
                  <i className="la la-lock text-white" />
                </InputGroupText>
                <Input
                  id="password"
                  className="input-transparent pl-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  name="password"
                  placeholder="Password"
                />
              </InputGroup>
            </FormGroup>
            <div className="bg-widget auth-widget-footer">
              <Button
                type="submit"
                color="danger"
                className="auth-btn"
                size="sm"
                style={{ color: '#fff' }}
              >
                <span className="auth-btn-circle" style={{ marginRight: 8 }}>
                  <i className="la la-caret-right" />
                </span>
                {isFetching ? 'Loading...' : 'Login'}
              </Button>
              <p className="widget-auth-info mt-4">Don't have an account? Sign up now!</p>

              <Link className="d-block text-center mb-4" to="/register">
                Create an Account
              </Link>
            </div>
          </form>
        </Widget>
      </Container>
      <footer className="auth-footer">
        {new Date().getFullYear()} &copy; Light Blue Template - React Admin Dashboard Template Made by{' '}
        <a href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">
          Flatlogic LLC
        </a>
        .
      </footer>
    </div>
  );
};

export default Login;
