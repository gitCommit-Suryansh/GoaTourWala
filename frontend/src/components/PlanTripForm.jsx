import React, { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Hotel,
  DollarSign,
  UtensilsCrossed,
  Heart,
  Plus,
  X,
  Send,
  Sparkles,
  Globe,
  Clock,
} from "lucide-react";
import axios from "axios";

const PlanTripForm = () => {
  const [subcategories, setSubcategories] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    adults: 1,
    children: 0,
    accommodationType: "",
    checkInDate: "",
    checkOutDate: "",
    selectedTrips: [],
    budgetRange: { min: "", max: "" },
    mealPreferences: "",
    purpose: "",
    addOns: [],
    specialRequests: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulated API call
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/subcategories/all`)
      .then((res) => setSubcategories(res.data.subcategories))
      .catch((err) => console.error("Failed to load trips", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      name.includes("budgetRange")
        ? {
            ...prev,
            budgetRange: { ...prev.budgetRange, [name.split(".")[1]]: value },
          }
        : { ...prev, [name]: value }
    );
  };

  const handleTripSelection = (name) => {
    setFormData((prev) => ({
      ...prev,
      selectedTrips: prev.selectedTrips.includes(name)
        ? prev.selectedTrips.filter((tripname) => tripname !== name)
        : [...prev.selectedTrips, name],
    }));
  };

  const handleAddOnToggle = (addon) => {
    setFormData((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(addon)
        ? prev.addOns.filter((item) => item !== addon)
        : [...prev.addOns, addon],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/plan-trip/submit`,
        formData
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert(
        "🎉 Your dream trip has been planned successfully! We'll contact you soon."
      );

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        adults: 1,
        children: 0,
        accommodationType: "",
        checkInDate: "",
        checkOutDate: "",
        selectedTrips: [],
        budgetRange: { min: "", max: "" },
        mealPreferences: "",
        purpose: "",
        addOns: [],
        specialRequests: "",
      });
      setCurrentStep(1);
    } catch (err) {
      console.error("Submission failed", err);
      alert("Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addOnOptions = [
    "Airport Transfer",
    "Travel Insurance",
    "Local Guide",
    "Photography",
    "Spa Services",
    "Nightlife",
    "Adventure Activities",
  ];
  const purposeOptions = [
    "Honeymoon",
    "Family Vacation",
    "Business Trip",
    "Solo Adventure",
    "Group Tour",
    "Anniversary",
    "Birthday Celebration",
    "Other",
  ];

  const steps = [
    { id: 1, title: "Personal Details", icon: Users },
    { id: 2, title: "Trip Preferences", icon: MapPin },
    { id: 3, title: "Accommodation & Dates", icon: Hotel },
    { id: 4, title: "Final Details", icon: Sparkles },
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.mobileNumber;
      case 2:
        return formData.selectedTrips.length > 0;
      case 3:
        return (
          formData.accommodationType &&
          formData.checkInDate &&
          formData.checkOutDate
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-4">
            <Globe className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-600 font-semibold">
              Dream Destinations
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Plan Your Perfect Trip
          </h1>
          <p className="text-gray-600 text-lg">
            Let us create an unforgettable experience tailored just for you
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
            <div
              className="absolute top-5 left-0 h-0.5 bg-indigo-600 z-10 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>

            {steps.map((step) => (
              <div
                key={step.id}
                className="relative z-20 flex flex-col items-center"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-white text-gray-400 shadow-md"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                    currentStep >= step.id ? "text-indigo-600" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="text-center mb-6">
                <Users className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Tell us about yourself
                </h2>
                <p className="text-gray-600">
                  We need some basic information to get started
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="+1 (555) 123-4567"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Purpose of Trip
                  </label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  >
                    <option value="">Select purpose</option>
                    {purposeOptions.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Adults
                  </label>
                  <input
                    type="number"
                    name="adults"
                    min="1"
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Children
                  </label>
                  <input
                    type="number"
                    name="children"
                    min="0"
                    value={formData.children}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Trip Preferences */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="text-center mb-6">
                <MapPin className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  What interests you?
                </h2>
                <p className="text-gray-600">
                  Choose the types of experiences you'd love to have
                </p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">
                  Select Trip Types *
                </label>
                <div className="max-h-64 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-3 pr-2">
                  {subcategories.map((trip) => (
                    <div
                      key={trip._id}
                      onClick={() => handleTripSelection(trip.name)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.selectedTrips.includes(trip.name)
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 hover:border-indigo-300 bg-white/70"
                      }`}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium block text-center">
                        {trip.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Budget Range */}
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Budget Range
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      name="budgetRange.min"
                      placeholder="Min"
                      value={formData.budgetRange.min}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70"
                    />
                    <input
                      type="number"
                      name="budgetRange.max"
                      placeholder="Max"
                      value={formData.budgetRange.max}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70"
                    />
                  </div>
                </div>

                {/* Meal Preferences */}
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4" />
                    Meal Preferences
                  </label>
                  <select
                    name="mealPreferences"
                    value={formData.mealPreferences}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  >
                    <option value="">Select preference</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="No Preference">No Preference</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Accommodation & Dates */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="text-center mb-6">
                <Hotel className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Accommodation & Dates
                </h2>
                <p className="text-gray-600">
                  Choose your stay and travel dates
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Hotel className="w-4 h-4" />
                  Accommodation Type *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {["Hotel", "Villa", "Apartment"].map((type) => (
                    <div
                      key={type}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          accommodationType: type,
                        }))
                      }
                      className={`cursor-pointer p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                        formData.accommodationType === type
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 hover:border-indigo-300 bg-white/70"
                      }`}
                    >
                      <Hotel className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    name="checkInDate"
                    required
                    value={formData.checkInDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Check-out Date *
                  </label>
                  <input
                    type="date"
                    name="checkOutDate"
                    required
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    min={
                      formData.checkInDate ||
                      new Date().toISOString().split("T")[0]
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Final Details */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="text-center mb-6">
                <Sparkles className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Almost Done!
                </h2>
                <p className="text-gray-600">
                  Add any special requirements or extras
                </p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">
                  Add-on Services
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {addOnOptions.map((addon) => (
                    <div
                      key={addon}
                      onClick={() => handleAddOnToggle(addon)}
                      className={`cursor-pointer p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                        formData.addOns.includes(addon)
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 hover:border-indigo-300 bg-white/70"
                      }`}
                    >
                      <Plus className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-sm font-medium">{addon}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  placeholder="Tell us about any special requirements, dietary restrictions, accessibility needs, or anything else we should know..."
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 resize-none"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center gap-2"
              >
                Next
                <Calendar className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Planning...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Plan My Trip
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            Made with love for amazing travelers
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanTripForm;
