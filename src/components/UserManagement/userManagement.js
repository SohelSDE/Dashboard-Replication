import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import updateUserData, {
  DELETE_USER,
  userRetrive,
} from "../../actions/userManagement";

function UserManagement(prop) {
  console.log("available prop", prop.getId);

  // console.log('id to be set',setId)
  let [password, setshowPassword] = useState(false);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(userRetrive());
  }, [dispatch]);

  // let userData=useSelector(state=>state.UserManagement)

  // let userInfo? = usersCred;
  let userInfo = useSelector((state) => state.userModification.data);
  let userSucess = useSelector((state) => state);

  console.log("user Management Data ", userSucess);

  let nav = useNavigate();
  function viewPass() {
    setshowPassword(true);
  }
  function hidePass() {
    setshowPassword(false);
  }
  function deleteUser(id) {
    if (id) {
      dispatch(updateUserData(id, DELETE_USER));

      toast.error("DELETED SUCCESSFULLY");
    } else {
      toast.error("USER ID  DOESN'T EXIST , ALREADY DELETED");
    }
  }
  function updateUser(id) {
    nav(`/update/${id}`);
    let idTobeUpdaed = prop.getId(id);
    console.log("idTobeUpdaed", idTobeUpdaed);
    toast.success(`${id} -UPDATE ON GOING`);
  }
  return (
    <div>
      <h1>User Management</h1>
      <Table dark style={{ border: "4px solid yellowgreen" }}>
        <thead>
          <tr style={{ border: "4px solid yellowgreen" }}>
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>PassWord</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={userInfo?.admin.id}>
            <th scope="row">{userInfo?.admin.id}</th>
            <td>{userInfo?.admin.username}</td>
            <td>{userInfo?.admin.role} </td>
            <td onMouseDown={viewPass} onMouseLeave={hidePass}>
              {password ? userInfo?.admin.password : "********"}
            </td>
            <td>
              <Button style={{ background: "transparent", color: "red" }}>
                DELETE
              </Button>
            </td>
            <td>
              <Button style={{ background: "transparent", color: "blue" }}>
                UPDATE
              </Button>
            </td>
          </tr>
          {userInfo?.users.map((usersCred) => (
            <tr key={usersCred.id} style={{ border: "2px solid purple" }}>
              <th scope="row">{usersCred.id}</th>
              <td>{usersCred.username}</td>
              <td>{usersCred.role}</td>
              <td onMouseDown={viewPass} onMouseLeave={hidePass}>
                {password ? usersCred.password : "********"}
              </td>
              <td>
                <Button color="danger" onClick={() => deleteUser(usersCred.id)}>
                  DELETE
                </Button>
              </td>
              <td>
                <>
                  <Button
                    color="primary"
                    onClick={() => updateUser(usersCred.id)}
                  >
                    UPDATE
                  </Button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserManagement;
