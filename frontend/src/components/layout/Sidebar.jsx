import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Users, Store, LogOut, Settings, ShieldCheck } from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();

  const getLinks = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin', icon: Home },
          { name: 'Agents', path: '/admin/agents', icon: Users },
          { name: 'Sub Admins', path: '/admin/subadmins', icon: ShieldCheck },
          { name: 'All Shops', path: '/admin/shops', icon: Store },
        ];
      case 'subadmin':
        return [
          { name: 'Dashboard', path: '/subadmin', icon: Home },
          { name: 'My Agents', path: '/subadmin/agents', icon: Users },
          { name: 'Network Shops', path: '/subadmin/shops', icon: Store },
        ];
      case 'agent':
        return [
          { name: 'Dashboard', path: '/agent', icon: Home },
          { name: 'My Shops', path: '/agent/shops', icon: Store },
          { name: 'Settings', path: '/agent/settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white min-h-screen">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <span className="text-xl font-bold">NexusAgent</span>
      </div>
      <div className="flex-1 py-4 flex flex-col gap-1 px-3">
        {getLinks().map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              end
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {link.name}
            </NavLink>
          );
        })}
      </div>
      <div className="p-4 border-t border-gray-800">
        <div className="mb-4">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 text-sm text-red-400 hover:bg-gray-800 rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log out
        </button>
      </div>
    </div>
  );
}
