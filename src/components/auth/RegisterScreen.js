import React from "react";
import { Link } from "react-router-dom";

export const RegisterScreen = () => {
  return (
    <>
      <h1 className="auth__title">Register</h1>

      <form>
        <input
          type="text"
          autoComplete="off"
          placeholder="Name"
          name="name"
          className="auth__input"
        />
        <input
          type="text"
          autoComplete="off"
          placeholder="Email"
          name="email"
          className="auth__input"
        />
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          name="password"
          className="auth__input"
        />
        <input
          type="password"
          autoComplete="off"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          login
        </button>

        <Link className="link " to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
};
