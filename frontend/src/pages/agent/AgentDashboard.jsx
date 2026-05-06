import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import { Store, PlusCircle } from 'lucide-react';

export default function AgentDashboard() {
  const { user } = useAuth();
  const [shops, setShops] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    shopName: '', ownerName: '', mobile: '', address: '', pincode: '', category: ''
  });

  useEffect(() => {
    const fetchShops = async () => {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/agent/shops', config);
      setShops(data);
    };
    fetchShops();
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('http://localhost:5000/api/agent/shops', formData, config);
      setShops([...shops, data]);
      setShowForm(false);
      setFormData({ shopName: '', ownerName: '', mobile: '', address: '', pincode: '', category: '' });
    } catch (error) {
      alert('Failed to add shop');
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            <PlusCircle className="w-5 h-5 mr-2" /> Add Shop
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">New Shop Details</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="shopName" required placeholder="Shop Name" onChange={handleChange} className="border-gray-300 rounded-md p-2 border" />
              <input name="ownerName" required placeholder="Owner Name" onChange={handleChange} className="border-gray-300 rounded-md p-2 border" />
              <input name="mobile" required placeholder="Mobile" onChange={handleChange} className="border-gray-300 rounded-md p-2 border" />
              <input name="category" placeholder="Category" onChange={handleChange} className="border-gray-300 rounded-md p-2 border" />
              <input name="address" required placeholder="Address" onChange={handleChange} className="border-gray-300 rounded-md p-2 border md:col-span-2" />
              <input name="pincode" required placeholder="Pincode" onChange={handleChange} className="border-gray-300 rounded-md p-2 border" />
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">Submit</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center">
            <Store className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">My Shops ({shops.length})</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Shop Name</th>
                <th className="px-6 py-3">Owner</th>
                <th className="px-6 py-3">Mobile</th>
                <th className="px-6 py-3">Pincode</th>
                <th className="px-6 py-3">Added On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {shops.map(shop => (
                <tr key={shop._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{shop.shopName}</td>
                  <td className="px-6 py-4 text-gray-600">{shop.ownerName}</td>
                  <td className="px-6 py-4 text-gray-600">{shop.mobile}</td>
                  <td className="px-6 py-4 text-gray-600">{shop.pincode}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(shop.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {shops.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No shops added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
