import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login({ goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

 
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

   localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));
navigate("/admin-dashboard");
  };

  return (
    <div className="auth-form">

   
    <form  onSubmit={handleLogin}>
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

     <button type="submit">Login</button>

<p>Don't have an account?</p>
<Link to="/register">Register</Link>

    </form>
     </div>
  );
}