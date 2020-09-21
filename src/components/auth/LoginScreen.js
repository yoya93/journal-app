import React from "react";

export const LoginScreen = () => {
  return (
    <div>
      <h1>LoginScreen</h1>

      <form>
        <input
          type="text"
          autoComplete="off"
          placeholder="email"
          name="email"
        />
        <input
          type="password"
          autoComplete="off"
          placeholder="password"
          name="password"
        />
        <button type="submit">login</button>
        <hr />
        <div>
          <p>Login with social networks</p>
        </div>
      </form>
    </div>
  );
};
