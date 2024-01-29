import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/user';

const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('authenticated') || false,
  errorMessage: '',
  data: null,
};

export default function auth(state = initialState, action) {
  console.log("any hit here action reducer ?",action.payload);

  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        data:action.payload.email,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}