import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ goToLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
       
        email: email.trim().toLowerCase(),
        password,
      });

      alert("Register Success! Now login.");
      console.log(res.data);
      goToLogin();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Register Failed");
    }
  };

  return (
    <div className="auth-form">
     <h2>Sign up</h2>

    <form  onSubmit={handleRegister}>
   

      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Register</button>

 <p>Already have an account?</p>
<Link to="/login">Login</Link>
    </form>
    </div>
  );
}
    