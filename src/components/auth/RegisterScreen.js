import React from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import { useDispatch } from "react-redux";

import { useForm } from "../../hooks/useForm";
import { setError, removeError } from "../actions/ui";

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    name: "Yoya",
    email: "@espainosa",
    password: "1234",
    password2: "1234",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log("Formulario correcto");
      dispatch(removeError());
    }

    console.log(name);
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      console.log("name is required");
      dispatch(setError("name is required"));

      return false;
    } else if (!validator.isEmail(email)) {
      console.log("Email is not valid");
      dispatch(setError("Email is not valid"));

      return false;
    } else if (password !== password2 || password.length < 5) {
      console.log(
        "Password should be at least 6 characters and match each other"
      );
      dispatch(
        setError(
          "Password should be at least 6 characters and match each other"
        )
      );

      return false;
    }

    return true;
  };

  return (
    <>
      <h1 className="auth__title">Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleInputChange}
          className="auth__input"
        />
        <input
          type="text"
          autoComplete="off"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="auth__input"
        />
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="auth__input"
        />
        <input
          type="password"
          autoComplete="off"
          placeholder="Confirm password"
          name="password2"
          value={password2}
          onChange={handleInputChange}
          className="auth__input"
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          login
        </button>

        <Link className="link " to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
};
