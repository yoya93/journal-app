import React from "react";
import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";

export const RegisterScreen = () => {
  const [formValues, handleInputChange] = useForm({
    name: "Yoya",
    email: "@espainosa",
    password: "1234",
    password2: "1234",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(name);
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
