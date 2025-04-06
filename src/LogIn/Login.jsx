import React from 'react'
import { Check } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Handle login logic here
      console.log("Logging in with:", email, password);
    } else {
      alert("Fill in all fields.");
    }
  }

  return (
    <div className="LoginBox">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="Email">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="Password">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='btn'>Login</button>
      </form>

      <div className="divider">
        <h3>Or Log in with</h3>
        {/* Replace with an actual image/icon if needed */}
        <button>Continue with <img src="/path/to/image.png" alt="Social Icon" /></button>

        <h4>New here? Create an Account</h4>

        <label className="policy">
          <input type="checkbox" id="policy" />
          <Check className='check' /> By signing in or creating an account, you agree to GhumGhamNepal's privacy policy, User Agreement, and T&Cs
        </label>
      </div>
    </div>
  );
}

export default Login;
