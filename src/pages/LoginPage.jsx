import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(form.username, form.password);
    setLoading(false);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className=" shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          className="border w-full px-3 py-2 mt-4"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="border w-full px-3 py-2 mt-4"
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 mt-6 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
