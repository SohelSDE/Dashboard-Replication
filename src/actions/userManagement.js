import { usersCred } from "../../src/components/UserManagement/userData";
export const UPDATE_USER = "USER_UPDATE";
export const DELETE_USER = "DELETE_USER";
export const USER_UPDATED = "USER_UPDATED";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_FAILED = "USER_UPDATE_FAILED";
let ud = usersCred;

export function userRetrive() {
  return {
    type: USER_UPDATED,
    payload: ud,
  };
}
export function userUpdatedSuccess(data) {
  return {
    type: USER_UPDATE_SUCCESS,
    payload: data,
  };
}

export function userUpdatedFailed(data) {
  return {
    type: USER_UPDATE_FAILED,
    payload: `${data.id} is not Updated`,
  };
}
export function userDataUpdate() {
  return (dispatch) => {
    dispatch(userRetrive());
  };
}

function mechanismOfUserUpdate(usersCred, id, updateData) {
  const userIndex = usersCred.users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return "User doesn't exist";
  }

  usersCred.users[userIndex] = {
    ...usersCred.users[userIndex],
    username: updateData.username,
    role: updateData.role,
    password: updateData.password,
  };

  return usersCred;
}
function mechanismOfUserDelete(usersCred, id) {
  // console.log('mechanismOfUserDelete getting ID?',id)
  const userIndex = usersCred.users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return "User doesn't exist";
  }

  usersCred.users[userIndex] = {
    ...usersCred.users.splice(userIndex, 0),
  };

  return usersCred;
}
export default function updateUserData(data, work) {
  let updateData = data;
  if (work === UPDATE_USER) {
    updateData = mechanismOfUserUpdate(ud, data.id, data);
  } else if (work === DELETE_USER) {
    console.log("mechanismOfUserDelete getting ID?", data);

    updateData = mechanismOfUserDelete(ud, data);
  }

  if (!data) {
    return (dispatch) => {
      dispatch(userUpdatedFailed(updateData));
    };
  } else {
    return (dispatch) => {
      dispatch(userUpdatedSuccess(updateData));
    };
  }
}
