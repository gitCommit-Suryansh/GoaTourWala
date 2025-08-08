import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Clock,
  Users,
  Star,
  MapPin,
  Camera,
  Check,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Phone,
  X,
  AlertCircle,
  Download,
  Save,
} from "lucide-react";
import Header from "./Header";
import logo from "../assets/logo.png";
import jsPDF from "jspdf";

const SubcategoryPage = () => {
  const { subSlug, categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const merchantOrderId = searchParams.get("merchantOrderId");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [data, setData] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [hasSavedPayment, setHasSavedPayment] = useState(false);
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/api/subcategories/get-by-slug/${subSlug}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error loading subcategory:", err));
  }, [subSlug]);

  useEffect(() => {
    if (data && activeImageIndex >= data.galleryImages.length) {
      setActiveImageIndex(0);
    }
  }, [data, activeImageIndex]);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (!merchantOrderId) return;
      setShowPaymentModal(true);
      setCheckingStatus(true);
      try {
        const res = await axios.post(
          `${REACT_APP_BACKEND_URL}/api/phonepe/check-payment-status`,
          { merchantOrderId }
        );
        if (res.data.status) {
          setPaymentStatus(res.data.status);
        }
      } catch (err) {
        console.error("Error fetching payment status:", err);
      } finally {
        setCheckingStatus(false);
      }
    };

    fetchPaymentStatus();
  }, [merchantOrderId]);
  
  useEffect(() => {
    const savePaymentToDB = async () => {
      if (!paymentStatus || !data || hasSavedPayment) return;

      try {
        await axios.post(`${REACT_APP_BACKEND_URL}/api/payment/create`, {
          ...paymentStatus,
          tripPackage: subSlug,
        });
        setHasSavedPayment(true);
      } catch (err) {
        console.error("Error saving payment:", err);
      }
    };

    savePaymentToDB();
  }, [paymentStatus, data, hasSavedPayment]);


  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg mx-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Crafting Your Next Journey
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Hold tight, incredible experiences are just a moment away...
          </p>
        </div>
      </div>
    );
  }

  const totalPrice = (adults + children) * data.price;
  console.log(name)
  const handleBooking = async () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      alert("Please enter a valid mobile number.");
      return;
    }

    if (adults === 0 && children === 0) {
      alert("Please select at least one person to book.");
      return;
    }

    const payload = {
      name, // 👈 new field
      adults,
      children,
      date: selectedDate,
      mobileNumber,
      amount: totalPrice * 100,
      categorySlug,
      subSlug,
    };
    
    
    try {
      const res = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/phonepe/pay`,
        payload
      );

      if (res.status == 200) {
        const tokenUrl = res.data.redirectUrl;
        window.PhonePeCheckout.transact({ tokenUrl });
      }

      // Optional: handle redirect or PhonePe SDK here
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Payment initiation failed. Please try again.");
    }
  };

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImageInModal = () => {
    setModalImageIndex(
      (prevIndex) => (prevIndex + 1) % data.galleryImages.length
    );
  };

  const prevImageInModal = () => {
    setModalImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + data.galleryImages.length) % data.galleryImages.length
    );
  };

  const shareLink = () => {
    const shareData = {
      title: data.name,
      text: `Check out this amazing experience: ${data.description}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Share successful"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert(`Share this link: ${window.location.href}`);
    }
  };

  const generatePdfReceipt = async () => {
    if (!paymentStatus) return;

    const doc = new jsPDF();

    // Import logo image
    const img = new Image();
    img.src = logo;

    // Wait for logo to load
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Calculate centered logo position with proper height
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 40;
    const logoHeight = (img.height / img.width) * logoWidth;
    const logoX = (pageWidth - logoWidth) / 2;

    // Add logo
    doc.addImage(img, "PNG", logoX, 10, logoWidth, logoHeight);

    // Move Y below logo
    let y = 10 + logoHeight + 8;

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("GoaTourWala Booking Receipt", pageWidth / 2, y, {
      align: "center",
    });

    y += 8;

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, y, pageWidth - 20, y);

    // Extract values
    const name = paymentStatus.metaInfo?.udf0?.split(":")[1] || "N/A";
    const mobile = paymentStatus.metaInfo?.udf1?.split(":")[1] || "N/A";
    const tripDate = paymentStatus.metaInfo?.udf3?.split(":")[1] || "N/A";
    const adults = paymentStatus.metaInfo?.udf4?.split(":")[1] || "0";
    const children = paymentStatus.metaInfo?.udf5?.split(":")[1] || "0";
    const amount = (paymentStatus.amount / 100).toFixed(2);
    const orderId = paymentStatus.orderId;
    const txnId = paymentStatus.paymentDetails?.[0]?.transactionId || "N/A";
    const status = paymentStatus.state;

    // Body content
    y += 15;
    const lineSpacing = 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const addLine = (label, value) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 30, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, 75, y);
      y += lineSpacing;
    };

    addLine("Customer Name", name);
    addLine("Mobile Number", mobile);
    addLine("Trip Date", tripDate);
    addLine("Adults", adults);
    addLine("Children", children);
    addLine("Order ID", orderId);
    addLine("Transaction ID", txnId);
    addLine("Payment Status", status);
    addLine("Amount Paid", `₹${amount}`);
    addLine("Receipt Generated", new Date().toLocaleString());

    // Bottom line
    doc.setLineWidth(0.3);
    doc.line(20, y, pageWidth - 20, y);
    y += 12;

    // Footer Notes
    doc.setFontSize(10);
    doc.setTextColor(50);

    doc.text("✅ Save this receipt for your reference.", 30, y);
    y += 6;
    doc.text(
      "📞 Our team will contact you shortly to confirm your trip.",
      30,
      y
    );
    y += 10;

    // Thank you footer
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("Thank you for booking with GoaTourWala!", pageWidth / 2, y, {
      align: "center",
    });

    // Save the PDF
    doc.save(`GoaTourWala_Receipt_${orderId}.pdf`);
  };

  const getStatusIcon = (state) => {
    switch (state) {
      case "COMPLETED":
        return <Check className="w-16 h-16 text-green-500" />;
      case "FAILED":
        return <AlertCircle className="w-16 h-16 text-red-500" />;
      default:
        return <Clock className="w-16 h-16 text-yellow-500" />;
    }
  };

  const getStatusMessage = (state) => {
    switch (state) {
      case "COMPLETED":
        return "Payment Successful!";
      case "FAILED":
        return "Payment Failed";
      default:
        return "Payment Processing";
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 font-sans antialiased">
        <div
          className="relative h-[60vh] md:h-[75vh] overflow-hidden group"
          style={{
            padding: "2px",
            "@media (min-width: 640px)": { padding: "4px" },
          }}
        >
          <img
            src={data.bannerImage || data.galleryImages[activeImageIndex]}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 rounded-md"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
          <div className="lg:col-span-2 space-y-8 md:space-y-12">
            <div className="relative">
              <div className="max-w-7xl mx-auto flex flex-col gap-4">
                <div className="flex-1">
                  <h1
                    className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2 capitalize drop-shadow-lg"
                    style={{
                      fontFamily: '"Play","Edu NSW ACT Cursive", cursive',
                    }}
                  >
                    {data.name}
                  </h1>
                  <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed drop-shadow-md">
                    {data.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3 items-center">
                    <span className="flex items-center gap-1 px-2 md:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-semibold text-xs md:text-sm">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      {data.duration} hours
                    </span>
                    <span className="flex items-center gap-1 px-2 md:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-semibold text-xs md:text-sm">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-300 fill-current" />
                      4.8 (234 reviews)
                    </span>
                    <span className="flex items-center gap-1 px-2 md:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-semibold text-xs md:text-sm">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                      Adventure Location
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 justify-center md:justify-end mt-4">
                  <button
                    className="p-2 md:p-3 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-all duration-200 shadow-xl"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    className="p-2 md:p-3 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-all duration-200 shadow-xl"
                    aria-label="Share this experience"
                    onClick={shareLink}
                  >
                    <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {data.galleryImages && data.galleryImages.length > 0 && (
              <section className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <Camera className="w-5 h-5 md:w-7 md:h-7 text-gray-700" />
                  <h2 className="text-xl md:text-3xl font-extrabold text-gray-900">
                    More Moments
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {data.galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openModal(index)}
                      className={`relative w-full h-32 md:h-40 rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-all duration-300 group ${
                        index === activeImageIndex
                          ? "ring-2 md:ring-3 ring-blue-500"
                          : "ring-1 ring-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm md:text-base">
                          View
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {data.features && data.features.length > 0 && (
              <section className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 border-b-2 md:border-b-3 border-blue-500 pb-2 inline-block">
                  What's Included
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                    >
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base font-medium text-gray-800 capitalize leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 border-b-2 md:border-b-3 border-blue-500 pb-2 inline-block">
                Experience Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {data.details.map((detail, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 capitalize flex items-center gap-2">
                      <Check className="w-4 h-4 md:w-5 md:h-5 bg-green-500 text-white flex-shrink-0 mt-0.5 rounded-md" />
                      {detail.title}
                    </h3>
                    {Array.isArray(detail.content) ? (
                      <ul className="space-y-2 md:space-y-3 list-none pl-0">
                        {detail.content.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3 h-3 md:w-4 md:h-4 text-blue-500 mt-1 flex-shrink-0" />
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                              {item}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {detail.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside
            className="lg:col-span-1 lg:sticky lg:top-0 lg:h-screen mb-5"
            style={{ scale: window.innerWidth > 768 ? 0.8 : 1 }}
          >
            <div className="lg:sticky lg:top-10 bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-xl space-y-4 md:space-y-5">
              <div className="text-center pb-4 md:pb-5 border-b border-gray-100">
                <p className="text-sm md:text-base font-semibold text-gray-600 mb-1">
                  Starting from
                </p>
                <div className="text-2xl md:text-4xl font-extrabold text-blue-700">
                  ₹{data.price}
                  <span className="text-lg md:text-xl text-gray-500 font-normal">
                    {" "}
                    / person
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Unlock unforgettable experiences!
                </p>
              </div>
              <div className="space-y-4 md:space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="booking-date"
                    className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-800"
                  >
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Choose Your Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base text-gray-800 focus:border-blue-600 focus:ring-blue-600 focus:outline-none transition-all duration-200 shadow-sm"
                  />
                </div>
                <div className="space-y-3 md:space-y-4">
                  <label className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-800">
                    <Users className="w-4 h-4 text-blue-600" />
                    Number of Guests
                  </label>
                  <div className="flex items-center justify-between p-3 md:p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                    <div>
                      <div className="font-bold text-gray-800 text-sm md:text-base">
                        Adults
                      </div>
                      <div className="text-xs text-gray-600">Age 18+</div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <button
                        onClick={() => setAdults(Math.max(0, adults - 1))}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-lg md:text-xl font-bold"
                        aria-label="Decrease adult count"
                      >
                        <Minus className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <span className="text-lg md:text-xl font-extrabold text-gray-900 w-6 md:w-8 text-center">
                        {adults}
                      </span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-lg md:text-xl font-bold"
                        aria-label="Increase adult count"
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 md:p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                    <div>
                      <div className="font-bold text-gray-800 text-sm md:text-base">
                        Children
                      </div>
                      <div className="text-xs text-gray-600">Age 4-8</div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-lg md:text-xl font-bold"
                        aria-label="Decrease child count"
                      >
                        <Minus className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <span className="text-lg md:text-xl font-extrabold text-gray-900 w-6 md:w-8 text-center">
                        {children}
                      </span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-lg md:text-xl font-bold"
                        aria-label="Increase child count"
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-800"
                  >
                    🙍 Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base text-gray-800 focus:border-blue-600 focus:ring-blue-600 focus:outline-none transition-all duration-200 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="mobile-number"
                    className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-800"
                  >
                    <Phone className="w-4 h-4 text-blue-600" />
                    Mobile Number
                  </label>
                  <input
                    id="mobile-number"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base text-gray-800 focus:border-blue-600 focus:ring-blue-600 focus:outline-none transition-all duration-200 shadow-sm"
                  />
                </div>

                <div className="p-4 md:p-5 bg-blue-50 rounded-lg border border-blue-200 mt-4 md:mt-5">
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-semibold text-blue-800">
                      Total Amount:
                    </span>
                    <span className="text-xl md:text-3xl font-extrabold text-blue-900">
                      ₹{totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full bg-blue-600 text-white font-extrabold py-3 md:py-4 px-4 md:px-5 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.01] shadow-lg flex items-center justify-center gap-2 text-base md:text-lg"
                >
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                  Reserve Your Adventure Now
                </button>
                <div className="space-y-2 pt-4 md:pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-500 flex-shrink-0" />
                    <span>Free cancellation up to 24 hours before</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-500 flex-shrink-0" />
                    <span>Instant confirmation on booking</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-500 flex-shrink-0" />
                    <span>Best price guarantee for your peace of mind</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
            <div className="relative bg-white rounded-lg p-2 max-w-full max-h-full overflow-hidden">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-white rounded-full text-zinc-700 hover:text-gray-800 p-1 md:p-0.5 text-base md:text-lg z-10"
              >
                ✖
              </button>
              <img
                src={data.galleryImages[modalImageIndex]}
                alt={`Gallery ${modalImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] rounded-lg object-contain"
              />
              <div className="flex justify-between mt-3">
                <button
                  onClick={prevImageInModal}
                  className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
                  disabled={modalImageIndex === 0}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={nextImageInModal}
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
                  disabled={modalImageIndex === data.galleryImages.length - 1}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          </div>
        )}

        {showPaymentModal && (
          <div
            className="fixed mt-2 inset-0 h-screen bg-gradient-to-br to-indigo-100 flex items-center justify-center p-4"
            style={{ scale: 0.8 }}
          >
            {/* Modal Overlay */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
              {/* Modal Content */}
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header with close button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-110"
                    onClick={() => setShowPaymentModal(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Loading State */}
                {checkingStatus && (
                  <div className="p-12 flex flex-col items-center gap-6">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 rounded-full bg-blue-50 animate-pulse"></div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Checking Payment Status
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Please wait while we verify your payment...
                      </p>
                    </div>
                  </div>
                )}

                {/* Payment Status */}
                {!checkingStatus && paymentStatus && (
                  <div className="p-8">
                    {/* Status Icon and Message */}
                    <div className="text-center mb-6">
                      <div className="flex justify-center mb-4">
                        <div
                          className={`p-4 rounded-full ${
                            paymentStatus.state === "COMPLETED"
                              ? "bg-green-100"
                              : paymentStatus.state === "FAILED"
                              ? "bg-red-100"
                              : "bg-yellow-100"
                          } animate-in zoom-in duration-500`}
                        >
                          {getStatusIcon(paymentStatus.state)}
                        </div>
                      </div>
                      <h2
                        className={`text-2xl font-bold mb-2 ${
                          paymentStatus.state === "COMPLETED"
                            ? "text-green-600"
                            : paymentStatus.state === "FAILED"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {getStatusMessage(paymentStatus.state)}
                      </h2>
                    </div>

                    {/* Payment Details */}
                    <div className="space-y-4 mb-6">
                      {/* Order ID */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">
                            Order ID
                          </span>
                          <span className="font-mono text-blue-600 font-semibold">
                            {paymentStatus.orderId}
                          </span>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">
                            Amount Paid
                          </span>
                          <span className="text-2xl font-bold text-green-700">
                            ₹{(paymentStatus.amount / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Customer Details */}
                      {paymentStatus.metaInfo && (
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            Booking Details
                          </h3>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Name:</span>
                              <span className="font-medium text-gray-800">
                                {paymentStatus.metaInfo.udf0?.split(":")[1] ||
                                  "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Date:</span>
                              <span className="font-medium text-gray-800">
                                {paymentStatus.metaInfo.udf3?.split(":")[1] ||
                                  "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Adults:</span>
                              <span className="font-medium text-gray-800">
                                {paymentStatus.metaInfo.udf4?.split(":")[1] ||
                                  "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Children:</span>
                              <span className="font-medium text-gray-800">
                                {paymentStatus.metaInfo.udf5?.split(":")[1] ||
                                  "N/A"}
                              </span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2">
                              <span className="text-gray-600">Mobile:</span>
                              <span className="font-medium text-gray-800">
                                {paymentStatus.metaInfo.udf1?.split(":")[1] ||
                                  "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Transaction ID */}
                      {paymentStatus.paymentDetails?.[0]?.transactionId && (
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="text-center">
                            <span className="text-xs text-gray-500">
                              Transaction ID
                            </span>
                            <p className="font-mono text-sm text-gray-700 mt-1">
                              {paymentStatus.paymentDetails[0].transactionId}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons and Messages */}
                    <div className="border-t border-gray-200 pt-6">
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Save className="w-4 h-4 text-blue-500" />
                          <span>Save details for reference</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-green-500" />
                          <span>We'll contact you shortly</span>
                        </div>
                      </div>

                      <button
                        onClick={generatePdfReceipt}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download PDF Receipt
                      </button>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {!checkingStatus && !paymentStatus && (
                  <div className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-red-100 rounded-full">
                        <AlertCircle className="w-12 h-12 text-red-500" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Unable to fetch payment status
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Please try again or contact support if the issue persists.
                    </p>
                    <button
                      onClick={() => setCheckingStatus(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubcategoryPage;
