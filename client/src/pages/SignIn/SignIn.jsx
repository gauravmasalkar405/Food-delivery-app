import React, { useState } from "react";
import axios from "axios";
import { signInUser } from "../../api/api.js";
import { addUser } from "../../store/slices/user.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateUser = async () => {
      if (name != "" && password != "") {
        try {
          const response = await axios.post(signInUser, {
            name: name,
            password: password,
          });

          if (response?.data.res) {
            dispatch(
              addUser({
                name: response.data.name,
                password: password,
              })
            );

            navigate(-1);
          } else {
            alert("Incorrect username or password");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("enter user details");
      }
    };

    validateUser();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
