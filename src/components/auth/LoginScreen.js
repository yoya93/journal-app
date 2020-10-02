import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../hooks/useForm";
import { startLoginEmailPassword, startGoogleLogin } from "../actions/auth";

export const LoginScreen = () => {
  const [formValues, handleInputChange] = useForm({
    email: "yoya@espainosa.com",
    password: "123456",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin(email, password));
  };

  return (
    <div className="animate__animated animate__fadeIn animate__faster">
      <h1 className="auth__title">Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Email"
          name="email"
          value={email}
          className="auth__input"
          onChange={handleInputChange}
        />
        <input
          type="password"
          autoComplete="off"
          placeholder="password"
          name="password"
          value={password}
          className="auth__input"
          onChange={handleInputChange}
        />
        <button
          disabled={loading}
          className="btn btn-primary btn-block"
          type="submit"
        >
          login
        </button>
        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p onClick={handleGoogleLogin} className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link className="link" to="/auth/register">
          Create new account
        </Link>
      </form>
    </div>
  );
};
