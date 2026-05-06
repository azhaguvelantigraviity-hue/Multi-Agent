import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import { Users, Store, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalAgents: 0, activeAgents: 0, totalShops: 0, shopsByPincode: [] });
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const [statsRes, agentsRes] = await Promise.all([
        axios.get('/api/admin/analytics', config),
        axios.get('/api/admin/agents', config)
      ]);
      setStats(statsRes.data);
      setAgents(agentsRes.data);
    };
    fetchData();
  }, [user]);

  const handleStatusChange = async (id, status) => {
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    await axios.put(`/api/admin/agents/${id}/status`, { status }, config);
    setAgents(agents.map(a => a._id === id ? { ...a, status } : a));
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users className="w-6 h-6" /></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Agents</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalAgents}</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CheckCircle className="w-6 h-6" /></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Agents</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.activeAgents}</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><Store className="w-6 h-6" /></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Shops</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalShops}</h3>
            </div>
          </div>
        </div>

        {/* Agents Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900">Recent Agents</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Mobile</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agents.map(agent => (
                <tr key={agent._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{agent.name}</td>
                  <td className="px-6 py-4 text-gray-600">{agent.email}</td>
                  <td className="px-6 py-4 text-gray-600">{agent.mobile}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      agent.status === 'approved' ? 'bg-green-100 text-green-700' :
                      agent.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {agent.status === 'pending' && (
                      <div className="space-x-2">
                        <button onClick={() => handleStatusChange(agent._id, 'approved')} className="text-green-600 hover:text-green-900 font-medium">Approve</button>
                        <button onClick={() => handleStatusChange(agent._id, 'rejected')} className="text-red-600 hover:text-red-900 font-medium">Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
