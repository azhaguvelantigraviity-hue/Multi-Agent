import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterAgent() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', mobile: '', address: '', pincode: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const { data } = await axios.post('/api/auth/register', formData);
      setMessage(data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Become an Agent</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already registered? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="bg-red-50 text-red-700 p-3 rounded">{error}</div>}
            {message && <div className="bg-green-50 text-green-700 p-3 rounded">{message}</div>}

            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input name="name" required onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input name="email" type="email" required onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input name="password" type="password" required onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input name="mobile" required onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input name="address" required onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pincode</label>
                <input name="pincode" required onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
            </div>

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Register Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
