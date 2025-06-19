import { Link } from "react-router";
import AuthLayout from '../components/AuthLayout';

const Login = () => (
  <AuthLayout>
    <h2>Login</h2>
    <form>
      <input type="email" placeholder='Email' required />
      <input type="password" placeholder='Password' required />
      <button type='submit'>Login</button>
    </form>
    <p>
      Don't have an account? <Link to="/register">Register</Link>
    </p>
  </AuthLayout>
);

export default Login;