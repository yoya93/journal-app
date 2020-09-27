import React from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../hooks/useForm";
import { setError, removeError } from "../actions/ui";
import { startRegisterWithEmailPasswordName } from "../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

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
      dispatch(removeError());
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password !== password2 || password.length < 5) {
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
        {msgError && <div className="auth__alert-error">{msgError}</div>}
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
