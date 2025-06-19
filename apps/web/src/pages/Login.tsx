import { useState } from 'react';
import { Link, useNavigate } from "react-router";
import AuthLayout from '../components/AuthLayout';
import { loginCommit } from '../mutations/LoginMutation';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginCommit(
      email,
      password,
      (resp) => {
        const token = resp.login?.token;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          alert("Erro no login");
        }
      }, (err) => {
        console.error(err);
        alert("Falha na requisição de login");
      }
    );
  };


  return (
    <AuthLayout>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;