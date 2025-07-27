import React, { useState, useEffect } from "react";
import {
  Package,
  CreditCard,
  Settings,
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
  Activity,
  Menu,
  X,
  ChevronRight,
  MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const navigate = useNavigate();

  // Admin routes configuration
  const adminRoutes = [
    {
      path: "/CreatePackage",
      title: "Create Package",
      description: "Create new travel packages and destinations",
      icon: Package,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      stats: "12 Active Packages",
    },
    {
      path: "/seePayments",
      title: "Payment Management",
      description: "View and manage customer payments",
      icon: CreditCard,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      stats: "₹2,45,000 This Month",
    },
    {
      path: "/editSubcategories",
      title: "Edit Subcategories",
      description: "Manage existing subcategories and classifications",
      icon: Settings,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      stats: "8 Categories",
    },
    {
      path: "/seePlanTrips",
      title: "View Planned Trips",
      description: "Manage received customized planned trips details",
      icon: MapPin, // Changed icon to MapPin for a different look
      color: "bg-yellow-500", // Changed color to bg-yellow-500 for a different UI color
      hoverColor: "hover:bg-yellow-600",
      stats: "20 Planned Trips",
    },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/stats`
        );
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/recent-payments`
        );
        setRecentPayments(res.data.payments);
      } catch (err) {
        console.error("Error fetching recent payments:", err);
      } finally {
        setLoadingRecent(false);
      }
    };
    fetchRecent();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Manage your travel business
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">A</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
              <div className="p-4">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <nav className="space-y-2">
                  {adminRoutes.map((route, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleNavigation(route.path);
                        setIsSidebarOpen(false);
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <route.icon className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-900">{route.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
              <p className="text-blue-100">
                Here's what's happening with your travel business today.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {loadingStats ? (
              <p>Loading stats...</p>
            ) : (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stats.totalBookings}
                  </h3>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    ₹{stats.revenue / 100}
                  </h3>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stats.activeUsers}
                  </h3>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stats.systemHealth}
                  </h3>
                  <p className="text-sm text-gray-600">System Health</p>
                </div>
              </>
            )}
          </div>

          {/* Admin Routes Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Admin Functions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {adminRoutes.map((route, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg ${route.color} text-white`}
                      >
                        <route.icon className="h-6 w-6" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {route.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {route.description}
                    </p>
                    <div className="flex items-center justify-between">
                      
                      <button
                        onClick={() => handleNavigation(route.path)}
                        className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors ${route.color} ${route.hoverColor}`}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            {loadingRecent ? (
              <p className="text-sm text-gray-500">
                Loading recent payments...
              </p>
            ) : recentPayments.length === 0 ? (
              <p className="text-sm text-gray-500">No recent activity found.</p>
            ) : (
              <div className="space-y-4">
                {recentPayments.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        payment.state === "COMPLETED"
                          ? "bg-green-500"
                          : payment.state === "FAILED"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {payment.name} paid ₹{(payment.amount / 100).toFixed(2)}{" "}
                        for{" "}
                        <span className="font-medium">
                          {payment.tripDetails.tripPackage}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(payment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
