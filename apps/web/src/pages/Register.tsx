import { Link } from 'react-router';

const Register = () => {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <input type="email" placeholder='Email' required />
        <input type="password" placeholder='Create password' required />
        <input type="passwordConfirm" placeholder='Confirm password' required />
        <button type='submit'>Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;