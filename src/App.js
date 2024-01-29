import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {  Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorPage from './pages/error';
import Register from './pages/register';
import {logoutUser } from './actions/user';
import Login from './pages/login';
import Layout from './components/Layout/Layout';
import './styles/theme.scss';


const CloseButton = ({ closeToast }) => (
  <i onClick={closeToast} className="la la-close notifications-close" />
);

const App = ({ location}) => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const selector = useSelector((state) => state );
  let isAuthenticated=selector.auth.isAuthenticated ;
  let email=selector.auth.data ? selector.auth.data:''


  useEffect(() => {
    const checkAuthentication = () => {
      if ( !isAuthenticated) {
         dispatch(logoutUser());
         navigate("/login");
        }
    };

    checkAuthentication();
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <div>
      <ToastContainer autoClose={5000} hideProgressBar closeButton={<CloseButton />} />
      {isAuthenticated? (
        <Layout dispatch={dispatch} location={location} user={email.toString()} />
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
