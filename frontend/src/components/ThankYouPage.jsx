import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  ArrowLeft,
  User,
  Phone,
  Calendar,
  Users,
  CreditCard,
  Hash,
  Sparkles,
} from "lucide-react";
import Header from "./Header";
import logo from "../assets/logo.png";
import jsPDF from "jspdf";

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const merchantOrderId = searchParams.get("merchantOrderId");
  const packageType = searchParams.get("packageType");
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [hasSavedPayment, setHasSavedPayment] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(10); // ⏳ countdown timer


  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (!merchantOrderId) return;

      try {
        const res = await axios.post(
          `${REACT_APP_BACKEND_URL}/api/phonepe/check-payment-status`,
          { merchantOrderId }
        );
        if (res.data.status) {
          setPaymentStatus(res.data.status);
        } else {
          setError("Payment status not found");
        }
      } catch (err) {
        setError("Unable to fetch payment status");
      } finally {
        setCheckingStatus(false);
      }
    };

    fetchPaymentStatus();
  }, [merchantOrderId]);

  useEffect(() => {
    const savePaymentToDB = async () => {
      if (!paymentStatus || hasSavedPayment) return;

      try {
        await axios.post(`${REACT_APP_BACKEND_URL}/api/payment/create`, {
          ...paymentStatus,
          tripPackage: packageType,
        });
        setHasSavedPayment(true);
      } catch (err) {
        console.error("Error saving payment:", err);
      }
    };

    savePaymentToDB();
  }, [paymentStatus, hasSavedPayment, packageType, REACT_APP_BACKEND_URL]);

  // ⏳ Auto redirect effect
  useEffect(() => {
    if (!checkingStatus && paymentStatus) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            navigate("/"); // redirect to home
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [checkingStatus, paymentStatus, navigate]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "COMPLETED":
        return {
          icon: (
            <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
          ),
          title: "Payment Successful!",
          subtitle: "Your Goa adventure awaits!",
          bgGradient: "from-green-50 to-emerald-100",
          borderColor: "border-green-200",
          textColor: "text-green-600",
        };
      case "FAILED":
        return {
          icon: <XCircle className="w-10 h-10 md:w-12 md:h-12 text-red-600" />,
          title: "Payment Failed",
          subtitle: "No amount has been deducted",
          bgGradient: "from-red-50 to-rose-100",
          borderColor: "border-red-200",
          textColor: "text-red-600",
        };
      case "PENDING":
        return {
          icon: <Clock className="w-10 h-10 md:w-12 md:h-12 text-yellow-600" />,
          title: "Payment Processing",
          subtitle: "We're confirming your payment",
          bgGradient: "from-yellow-50 to-amber-100",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-600",
        };
      default:
        return {
          icon: (
            <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-gray-600" />
          ),
          title: "Status Unknown",
          subtitle: "Please contact support",
          bgGradient: "from-gray-50 to-slate-100",
          borderColor: "border-gray-200",
          textColor: "text-gray-600",
        };
    }
  };

  const generatePdfReceipt = async () => {
    if (!paymentStatus) return;
  
    const doc = new jsPDF();
  
    // Logo
    const img = new Image();
    img.src = logo;
    await new Promise((resolve) => (img.onload = resolve));
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 40;
    const logoHeight = (img.height / img.width) * logoWidth;
    const logoX = (pageWidth - logoWidth) / 2;
  
    doc.addImage(img, "PNG", logoX, 10, logoWidth, logoHeight);
  
    let y = 10 + logoHeight + 10;
  
    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("GoaTourWala Booking Receipt", pageWidth / 2, y, { align: "center" });
  
    y += 12;
    doc.setDrawColor(0);
    doc.setLineWidth(0.6);
    doc.line(20, y, pageWidth - 20, y);
    y += 10;
  
    // Section heading style
    const addSectionHeading = (title) => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 102, 204); // blue highlight
      doc.text(title, 20, y);
      y += 6;
      doc.setLineWidth(0.3);
      doc.line(20, y, pageWidth - 20, y);
      y += 8;
      doc.setTextColor(0, 0, 0);
    };
  
    // Key-value line style
    const addLine = (label, value, highlight = false) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 30, y);
      doc.setFont("helvetica", "normal");
      if (highlight) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(200, 0, 0); // red highlight
        doc.setFontSize(13);
      }
      doc.text(value, 75, y);
      if (highlight) {
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
      }
      y += 8;
    };
  
    // Extract values
    const name = paymentStatus.metaInfo?.udf1?.split(":")[1] || "N/A";
    const mobile = paymentStatus.metaInfo?.udf2?.split(":")[1] || "N/A";
    const tripName = packageType;
    const tripDate = paymentStatus.metaInfo?.udf4?.split(":")[1] || "N/A";
    const adults = paymentStatus.metaInfo?.udf5?.split("|")[0].split(":")[1] || "0";
    const children = paymentStatus.metaInfo?.udf5?.split("|")[1].split(":")[1] || "0";
    const amount = (paymentStatus.amount / 100).toFixed(2);
    const orderId = paymentStatus.orderId;
    const txnId = paymentStatus.paymentDetails?.[0]?.transactionId || "N/A";
    const status = paymentStatus.state;
  
    // Booking Details
    addSectionHeading("Booking Details");
    addLine("Customer Name", name);
    addLine("Mobile Number", mobile);
    addLine("Package Name", tripName);
    addLine("Trip Date", tripDate);
    addLine("Adults", adults);
    addLine("Children", children);
  
    // Payment Details
    y += 5;
    addSectionHeading("Payment Details");
    addLine("Order ID", orderId);
    addLine("Transaction ID", txnId);
    addLine("Payment Status", status);
    addLine("Amount Paid", `INR ${amount}`, true);
    addLine("Receipt Generated", new Date().toLocaleString());
  
    // Footer
    y += 10;
    doc.setLineWidth(0.3);
    doc.line(20, y, pageWidth - 20, y);
    y += 8;
  
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text("Save this receipt for your reference.", pageWidth / 2, y, { align: "center" });
    y += 6;
    doc.text("Our team will contact you shortly to confirm your trip.", pageWidth / 2, y, { align: "center" });
    y += 12;
  
    doc.setFontSize(11);
    doc.setTextColor(0, 102, 0);
    doc.text("Thank you for booking with GoaTourWala!", pageWidth / 2, y, { align: "center" });
  
    y += 10;
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("www.goatourwala.com | info@goatourwala.com  | +91-8999732703",pageWidth / 2, y, { align: "center" });
      
    doc.save(`GoaTourWala_Receipt_${orderId}.pdf`);
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative mb-4">
            <div className="w-12 h-12 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-2 w-9 h-9 border-2 border-transparent border-t-purple-400 rounded-full animate-spin animate-reverse"></div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1 animate-pulse">
            Checking Payment Status
          </h2>
          <p className="text-gray-600 animate-bounce">
            Please wait while we verify...
          </p>
        </div>
      </div>
    );
  }

  if (error || !paymentStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center animate-scale-in">
          <div className="animate-bounce mb-4">
            <AlertTriangle className="w-14 h-14 text-red-500 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-3 animate-slide-up">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4 animate-fade-in animation-delay-300">
            {error}
          </p>
          <div className="space-y-3 animate-fade-in animation-delay-500">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(paymentStatus.state);

  return (
    <div className="h-screen overflow-hidden width-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-0 pb-2 md:pb-4">
    
      <div className="width-full mx-auto px-3 md:px-6 pt-20 md:pt-20 pb-2 md:pb-3">
        <div className="mb-3 md:mb-4 animate-slide-down">
          <h1 className="text-lg md:text-2xl font-bold text-gray-800 leading-tight">
            Thank You!
          </h1>
          <p className="text-gray-600 text-xs md:text-base mt-0.5 md:mt-1 leading-snug">
            Here are your booking details
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden animate-scale-in transform md:scale-100">
          {/* Status Header */}
          <div
            className={`bg-gradient-to-r ${statusConfig.bgGradient} ${statusConfig.borderColor} border-b p-2.5 md:p-4 text-center animate-fade-in`}
          >
            <div className="flex justify-center mb-2 md:mb-3">
              <div className="animate-bounce">{statusConfig.icon}</div>
            </div>
            <h2
              className={`text-base md:text-xl font-bold ${statusConfig.textColor} mb-0.5 md:mb-1 leading-tight`}
            >
              {statusConfig.title}
            </h2>
            <p className="text-gray-600 text-xs md:text-base leading-snug">
              {statusConfig.subtitle}
            </p>
          </div>

          <div className="p-2.5 md:p-4">
            {/* Payment Summary */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3 mb-2 md:mb-4 animate-slide-up animation-delay-300">
              <div className="bg-white rounded-xl p-2 md:p-3 shadow-sm border transition-all duration-300 hover:shadow-md hover:scale-105">
                <div className="flex items-center gap-2 mb-1">
                  <Hash className="w-5 h-5 text-blue-500" />
                  <span className="text-xs font-medium text-gray-600">
                    Order ID
                  </span>
                </div>
                <p className="font-mono text-xs md:text-base font-semibold text-gray-800 truncate" title={paymentStatus.orderId}>
                  {paymentStatus.orderId}
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl p-2 md:p-3 shadow-sm border border-green-200 transition-all duration-300 hover:shadow-md hover:scale-105">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <span className="text-xs font-medium text-gray-600">
                    Amount Paid
                  </span>
                </div>
                <p className="text-base md:text-xl font-bold text-green-700 leading-tight">
                  ₹{(paymentStatus.amount / 100).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Customer Details */}
            {paymentStatus.metaInfo && (
              <div className="bg-blue-50/50 rounded-xl p-2.5 md:p-4 mb-2.5 md:mb-4 border border-blue-100 animate-slide-up animation-delay-500">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xs md:text-base font-semibold text-gray-800 leading-tight">
                    Trip Details
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3">
                  <div className="flex items-center gap-2 p-1 md:pl-2 bg-white/70 rounded-lg transition-all duration-300 hover:bg-white hover:scale-105">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                    <div>
                      <p className="text-[11px] md:text-xs text-gray-500 uppercase tracking-wide leading-none">
                        Customer
                      </p>
                      <p className="font-semibold text-gray-800 text-sm md:text-base leading-tight truncate" title={paymentStatus.metaInfo.udf1?.split(":")[1] || "N/A"}>
                        {paymentStatus.metaInfo.udf1?.split(":")[1] || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-1 md:pl-2 bg-white/70 rounded-lg transition-all duration-300 hover:bg-white hover:scale-105">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                    <div>
                      <p className="text-[11px] md:text-xs text-gray-500 uppercase tracking-wide leading-none">
                        Mobile
                      </p>
                      <p className="font-semibold text-gray-800 text-sm md:text-base leading-tight">
                        {paymentStatus.metaInfo.udf2?.split(":")[1] || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-1 md:pl-2 bg-white/70 rounded-lg transition-all duration-300 hover:bg-white hover:scale-105">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                    <div>
                      <p className="text-[11px] md:text-xs text-gray-500 uppercase tracking-wide leading-none">
                        Trip Date
                      </p>
                      <p className="font-semibold text-gray-800 text-sm md:text-base leading-tight">
                        {paymentStatus.metaInfo.udf4?.split(":")[1] || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-1 md:pl-2 bg-white/70 rounded-lg transition-all duration-300 hover:bg-white hover:scale-105">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                    <div>
                      <p className="text-[11px] md:text-xs text-gray-500 uppercase tracking-wide leading-none">
                        Travelers
                      </p>
                      <p className="font-semibold text-gray-800 text-sm md:text-base leading-tight">
                        {paymentStatus.metaInfo.udf5
                          ?.split("|")[0]
                          ?.split(":")[1] || "0"}{" "}
                        Adults,{" "}
                        {paymentStatus.metaInfo.udf5
                          ?.split("|")[1]
                          ?.split(":")[1] || "0"}{" "}
                        Children
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction ID */}
            {paymentStatus.paymentDetails?.[0]?.transactionId && (
              <div className="bg-gray-50 rounded-lg p-2 md:p-3 mb-2.5 md:mb-4 text-center border animate-fade-in animation-delay-700">
                <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
                <p className="font-mono text-sm md:text-sm font-semibold text-gray-700 truncate" title={paymentStatus.paymentDetails[0].transactionId}>
                  {paymentStatus.paymentDetails[0].transactionId}
                </p>
              </div>
            )}

            {/* Action Button */}
            <div className="animate-slide-up animation-delay-800">
              <button
                onClick={generatePdfReceipt}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs md:text-base px-3 py-2 md:px-5 md:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 md:w-5 md:h-5" />
                Download PDF Receipt
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-3 animate-fade-in hidden md:block">
          <p className="text-gray-600 text-sm md:text-base">
            You will be redirected to the home page in{" "}
            <span className="font-bold text-blue-600">{countdown}</span> seconds.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-2 animate-fade-in animation-delay-1000">
          <p className="text-gray-600 text-xs md:text-base leading-tight">
            🏖️ Thank you for choosing{" "}
            <span className="font-semibold text-blue-600">GoaTourWala</span>!
          </p>
          <p className="hidden md:block text-xs md:text-sm text-gray-500 mt-1">
            We'll contact you shortly to confirm your trip details.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-reverse {
          animation-direction: reverse;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .animation-delay-700 {
          animation-delay: 700ms;
        }
        .animation-delay-800 {
          animation-delay: 800ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default ThankYouPage;
