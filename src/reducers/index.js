import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import dataReducer from './dataReducer';
import userModification from './userModification';

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  // dataFetch,
  dataReducer,
  userModification,

});
