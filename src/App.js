import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {  Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorPage from './pages/error';
import Register from './pages/register';
import { logoutUser } from './actions/user';
import Login from './pages/login';
import Layout from './components/Layout/Layout';
import './styles/theme.scss';


const CloseButton = ({ closeToast }) => (
  <i onClick={closeToast} className="la la-close notifications-close" />
);

const App = ({ dispatch, location}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      if ( !localStorage.getItem('authenticated')) {
         dispatch(logoutUser());
         navigate("/login");
        }
    };

    checkAuthentication();
  }, [dispatch, navigate]);

  return (
    <div>
      <ToastContainer autoClose={5000} hideProgressBar closeButton={<CloseButton />} />
      {localStorage.getItem('authenticated') ? (
        <Layout dispatch={dispatch} location={location} />
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
