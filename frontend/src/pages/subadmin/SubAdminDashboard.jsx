import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import { Users, Store } from 'lucide-react';

export default function SubAdminDashboard() {
  const { user } = useAuth();
  const [agents, setAgents] = useState([]);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const [agentsRes, shopsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/subadmin/agents', config),
        axios.get('http://localhost:5000/api/subadmin/shops', config)
      ]);
      setAgents(agentsRes.data);
      setShops(shopsRes.data);
    };
    fetchData();
  }, [user]);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Sub Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users className="w-6 h-6" /></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">My Assigned Agents</p>
              <h3 className="text-2xl font-bold text-gray-900">{agents.length}</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><Store className="w-6 h-6" /></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Shops in Network</p>
              <h3 className="text-2xl font-bold text-gray-900">{shops.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900">Network Shops</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Shop Name</th>
                <th className="px-6 py-3">Owner</th>
                <th className="px-6 py-3">Pincode</th>
                <th className="px-6 py-3">Added By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {shops.map(shop => (
                <tr key={shop._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{shop.shopName}</td>
                  <td className="px-6 py-4 text-gray-600">{shop.ownerName}</td>
                  <td className="px-6 py-4 text-gray-600">{shop.pincode}</td>
                  <td className="px-6 py-4 text-gray-600">{shop.createdBy?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
