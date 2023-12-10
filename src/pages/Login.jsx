import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { login } from "../utils/network-data";
import useInput from "../components/elements/UseInput";

export default function Login({ loginSuccess }) {

  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");


  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { error, data } = await login({ email, password });
  
      if (!error) {
        loginSuccess(data?.accessToken);
      } 
    } catch (error) {
      console.error("An unexpected error occurred during login:", error);
    }
  };
  

  return (
    <section className="login-page">
      <h2>Yuk, login untuk menggunakan aplikasi.</h2>
      <form onSubmit={onSubmitHandler} className="input-login">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={onEmailChangeHandler} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={onPasswordChangeHandler} />
        <button type="submit">Login</button>
      </form>
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </section>
  );
}

Login.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};
