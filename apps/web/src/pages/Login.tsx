import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="email" placeholder='Email' required />
        <input type="password" placeholder='Password' required />
        <button type='submit'>Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;