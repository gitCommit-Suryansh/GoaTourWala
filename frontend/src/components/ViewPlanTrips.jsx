import React, { useEffect, useState } from "react";
import { Search, Eye, X, Calendar, User, Phone, MapPin, Users, Baby, CreditCard, Utensils, Package, Clock } from "lucide-react";
import axios from "axios";

const ViewPlanTrips = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/plan-trip/all`);
        setPlans(res.data.plans);
      } catch (err) {
        console.error("Error loading plans", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setIsModalOpen(false);
  };

  const filteredPlans = plans.filter((plan) => {
    const query = searchQuery.toLowerCase();
    return (
      plan.fullName?.toLowerCase().includes(query) ||
      plan.email?.toLowerCase().includes(query) ||
      plan.mobileNumber?.toLowerCase().includes(query)
    );
  });

  const getPurposeColor = (purpose) => {
    switch (purpose?.toLowerCase()) {
      case "business":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "leisure":
        return "bg-green-100 text-green-700 border-green-200";
      case "family":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "honeymoon":
        return "bg-pink-100 text-pink-700 border-pink-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const calculateDuration = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600">Loading trip plans...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trip Plans Management</h1>
          <p className="text-gray-600">Monitor and manage all customer trip planning requests</p>
        </div>

        {/* Search and Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by name, email, or mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{plans.length}</p>
                <p className="text-sm text-gray-600">Total Plans</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {plans.filter(p => p.purpose === "business").length}
                </p>
                <p className="text-sm text-gray-600">Business</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {plans.filter(p => p.purpose === "leisure").length}
                </p>
                <p className="text-sm text-gray-600">Leisure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <LoadingSpinner />
          ) : plans.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No trip plans found</p>
              <p className="text-gray-400 text-sm">Trip planning requests will appear here once customers submit them</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Trip Details</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Duration</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Budget Range</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Purpose</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPlans.map((plan) => (
                    <tr key={plan._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{plan.fullName}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {plan.mobileNumber}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900 font-medium">
                              {plan.selectedTrips.slice(0, 2).join(", ")}
                              {plan.selectedTrips.length > 2 && " ..."}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users className="h-3 w-3" />
                            {plan.adults} Adults, {plan.children} Children
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <span className="text-gray-900 font-medium">
                              {calculateDuration(plan.checkInDate, plan.checkOutDate)} days
                            </span>
                            <p className="text-xs text-gray-500">
                              {new Date(plan.checkInDate).toLocaleDateString()} - {new Date(plan.checkOutDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold text-gray-900">
                            ₹{plan.budgetRange.min} - ₹{plan.budgetRange.max}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPurposeColor(plan.purpose)}`}>
                          {plan.purpose}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => openModal(plan)}
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Enhanced Modal */}
        {isModalOpen && selectedPlan && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white max-w-4xl w-full rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto" style={{maxHeight:'80vh'}}>
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Trip Plan Details</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Customer Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium text-gray-900">{selectedPlan.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{selectedPlan.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Mobile Number</p>
                      <p className="font-medium text-gray-900">{selectedPlan.mobileNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Trip Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Trip Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Purpose</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPurposeColor(selectedPlan.purpose)}`}>
                        {selectedPlan.purpose}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Accommodation Type</p>
                      <p className="font-medium text-gray-900">{selectedPlan.accommodationType}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Selected Trips</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedPlan.selectedTrips.map((trip, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm">
                            {trip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Travel Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    Travel Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Check-in Date</p>
                      <p className="font-medium text-gray-900">{new Date(selectedPlan.checkInDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Check-out Date</p>
                      <p className="font-medium text-gray-900">{new Date(selectedPlan.checkOutDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Adults
                      </p>
                      <p className="font-medium text-gray-900">{selectedPlan.adults}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Baby className="h-3 w-3" />
                        Children
                      </p>
                      <p className="font-medium text-gray-900">{selectedPlan.children}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Duration
                      </p>
                      <p className="font-medium text-gray-900">
                        {calculateDuration(selectedPlan.checkInDate, selectedPlan.checkOutDate)} days
                      </p>
                    </div>
                  </div>
                </div>

                {/* Budget & Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-orange-600" />
                      Budget Information
                    </h4>
                    <div>
                      <p className="text-sm text-gray-600">Budget Range</p>
                      <p className="font-bold text-lg text-gray-900">
                        ₹{selectedPlan.budgetRange.min} - ₹{selectedPlan.budgetRange.max}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-red-600" />
                      Meal Preferences
                    </h4>
                    <div>
                      <p className="text-sm text-gray-600">Meal Type</p>
                      <p className="font-medium text-gray-900">{selectedPlan.mealPreferences}</p>
                    </div>
                  </div>
                </div>

                {/* Add-ons & Special Requests */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Package className="h-5 w-5 text-indigo-600" />
                    Additional Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Add-ons</p>
                      {selectedPlan.addOns && selectedPlan.addOns.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedPlan.addOns.map((addon, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md text-sm">
                              {addon}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No add-ons selected</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Special Requests</p>
                      <p className="font-medium text-gray-900">
                        {selectedPlan.specialRequests || "No special requests"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPlanTrips;