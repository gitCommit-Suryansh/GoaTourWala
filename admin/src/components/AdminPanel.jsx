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
  MapPin,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const AdminPanel = () => {
  // Local storage based auth (12h expiry)
  const ADMIN_EMAIL = "sushil@goatourwala.com";
  const ADMIN_PASSWORD = "201607At@";
  const SESSION_KEY = "adminSession";
  const SESSION_DURATION_MS = 12 * 60 * 60 * 1000;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const navigate = useNavigate();

  // Check session on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.expiry && parsed.expiry > Date.now()) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } catch (_) {}
    setAuthChecked(true);
  }, []);

  // Auto-logout when expired (poll every minute)
  useEffect(() => {
    if (!isAuthenticated) return;
    const id = setInterval(() => {
      try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) {
          setIsAuthenticated(false);
          return;
        }
        const parsed = JSON.parse(raw);
        if (!parsed?.expiry || parsed.expiry <= Date.now()) {
          localStorage.removeItem(SESSION_KEY);
          setIsAuthenticated(false);
        }
      } catch (_) {
        setIsAuthenticated(false);
      }
    }, 60000);
    return () => clearInterval(id);
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail.trim() === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      const expiry = Date.now() + SESSION_DURATION_MS;
      localStorage.setItem(SESSION_KEY, JSON.stringify({ expiry }));
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

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
    if (!isAuthenticated) return;
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
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
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
  }, [isAuthenticated]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (authChecked && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-orange-100 p-6">
          <div className="text-center mb-6">
            <img src={logo} alt="GoaTourWala Logo" className="mx-auto h-14 w-14 rounded-xl shadow" />
            <h2 className="mt-3 text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-sm text-gray-600">Please sign in to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="sushil@goatourwala.com"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-700/30 transition">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-orange-200">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-5">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-3 rounded-xl hover:bg-orange-50 transition-all duration-200 border border-orange-200"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6 text-orange-600" />
              ) : (
                <Menu className="h-6 w-6 text-orange-600" />
              )}
            </button>

            {/* Enhanced Brand Section */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative group">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300">
                  <span className="text-white font-bold text-xl">
                    <img
                      src={logo}
                      alt="GoaTourWala Logo"
                      className="h-auto w-auto cursor-pointer"
                    />
                  </span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl opacity-20 blur-sm group-hover:opacity-40 transition-all duration-300"></div>
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text">
                  Goa Tour Wala
                </h1>
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-medium">
                    Admin Control Center
                  </span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Right Section */}
          <div className="flex items-center gap-5">
            {/* Quick Stats */}
            {loadingStats ? (
              <p>Loading stats...</p>
            ) : (
              <div className="hidden md:flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Today's Bookings</p>
                  <p className="text-lg font-bold text-orange-600">
                    {stats.totalBookings}
                  </p>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{stats.revenue / 100}
                  </p>
                </div>
              </div>
            )}

            {/* User Profile */}
            <div className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-2xl border hover:shadow-md transition-all duration-200">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">Admin User</p>
                <p className="text-xs text-orange-600 font-medium">
                  Super Administrator
                </p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">AU</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <button onClick={handleLogout} className="ml-3 text-xs font-medium text-red-600 hover:text-red-700 border border-red-200 rounded-lg px-3 py-1.5">Logout</button>
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
        <main className="flex-1 p-4 md:p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 md:p-6 text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Welcome back, Admin!</h2>
              <p className="text-blue-100 text-sm md:text-base">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4 md:mb-6">
              Admin Functions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {adminRoutes.map((route, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg ${route.color} text-white`}
                      >
                        <route.icon className="h-6 w-6" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                    <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                      {route.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3 md:mb-4">
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
