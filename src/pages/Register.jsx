import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/network-data";
import useInput from "../components/elements/UseInput";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");

  const handleRegister = async () => {
    try {
      if (!name || !email || !password || password !== confirmPassword) {
        alert("Invalid input. Please check your information.");
        return;
      }

      const { error } = await register({ name, email, password });

      if (!error) {
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  }

  return (
    <section className="register-page">
      <h2>Isi Form untuk mendaftar akun.</h2>
      <div className="input-register">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={setName}/>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={setEmail} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={setPassword} />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={setConfirmPassword} />
        <button type="button" onClick={handleRegister}>Register</button>
      </div>
      <p>
        Sudah punya akun? <Link to="/">Login di sini</Link>
      </p>
    </section>
  );
}
