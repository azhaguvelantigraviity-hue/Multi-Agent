import { Link } from 'react-router-dom';
import { Users, Building, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-indigo-600">NexusAgent</div>
            <div className="space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Log in</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700">Become an Agent</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Manage your network of agents with ease
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            The all-in-one SaaS platform for multi-agent hierarchical management. Track performance, onboard shops, and grow your revenue securely.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="flex items-center bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How the system works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl">
              <ShieldCheck className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Registration</h3>
              <p className="text-gray-600">Agents sign up and submit their details. Admin verifies and approves the application securely.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <Users className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sub Admin Delegation</h3>
              <p className="text-gray-600">Admins assign approved agents to Sub Admins to manage performance regionally.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <Building className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Shop Onboarding</h3>
              <p className="text-gray-600">Agents add and manage shops in their locality, while admins track pincode-wise analytics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
