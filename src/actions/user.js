
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin(payload) {
    // auth(
    // {...data}
    // )
    return {
        type: LOGIN_SUCCESS,
        payload,
    };

}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('authenticated');
        dispatch(receiveLogout());
    };
}

export function loginUser(creds) {
  
    
    return (dispatch) => {

        if (creds.email.length > 0 && creds.password.length > 0) {
            console.log("Going to set inv.......",creds);
            if(creds.email.toLowerCase()==="sohelislam993@gmail.com"&&creds.password==="TECHSTAR")
            {

                console.log("Going to set inv.......,",(creds));

                localStorage.setItem('authenticated', true)
              
                dispatch(receiveLogin(creds));


            }
        } else {
            dispatch(loginError('Something was wrong. Try again'));
        }
    }
}
