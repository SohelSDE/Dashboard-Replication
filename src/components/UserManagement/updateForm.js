import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./userStyle.css";
import { useDispatch } from "react-redux";
import updateUserData, { UPDATE_USER } from "../../actions/userManagement";

function UpdateForm(userId) {
  const [formData, setFormData] = useState({
    id: 0,
    role: "Admin",
    username: "Demo@gmail.com",
    password: "*****",
  });
  let dispatch = useDispatch();
  let UserId = userId;
  console.log("UserId", UserId);
  let nav = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      id: UserId.userId,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("form data", formData);
    dispatch(updateUserData(formData, UPDATE_USER));
    nav("/userManagement");
  }
  return (
    <div
      style={{
        border: "3px solid greenyellow",
      }}
    >
      <Form
        style={{
          margin: "20px 20px 10px 10px",
          textAlign: "center",

          padding: "20px",
          background: "black",
        }}
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <Label for="id" hidden>
            Id
          </Label>
          <Input
            id="id"
            name="User-Id"
            value={UserId.userId}
            onChange={handleChange}
            type="Number"
            disabled
            style={{
              color: "red",
              fontWeight: "bold",
              textAlign: "center",
              background: "transparent",
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="username" hidden>
            User Name
          </Label>
          <Input
            id="Name"
            name="username"
            placeholder="Name"
            type="Name"
            onChange={handleChange}
            style={{
              color: "blue",
              fontWeight: "bold",
              textAlign: "center",
              background: "transparent",
            }}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="Email" hidden>
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="email"
            type="email"
            onChange={handleChange}
            style={{
              color: "blue",
              fontWeight: "bold",
              textAlign: "center",
              background: "transparent",
            }}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="exampleRole" hidden>
            ROLE
          </Label>
          <Input
            id="role"
            name="role"
            placeholder="role"
            type="name"
            onChange={handleChange}
            style={{
              color: "blue",
              fontWeight: "bold",
              textAlign: "center",
              background: "transparent",
            }}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="examplePassword" hidden>
            Password
          </Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            style={{
              color: "blue",
              fontWeight: "bold",
              textAlign: "center",
              background: "transparent",
            }}
          />
        </FormGroup>{" "}
        <Button
          color="success"
          // onClick={() => {
          //   nav("/userManagement");
          // }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UpdateForm;
