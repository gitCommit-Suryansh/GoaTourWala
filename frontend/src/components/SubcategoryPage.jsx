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
  MessageCircle,
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import logo from "../assets/logo.png";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import seoData from "../seoData";

const SubcategoryPage = () => {
  const { subSlug, categorySlug } = useParams();
  const key = subSlug ? subSlug.toLowerCase() : "";
  const seo = seoData[key] || seoData.default;

  // canonical url (build carefully in production)
  const canonical =
    seo.url || `${window.location.origin}/${categorySlug}/${subSlug}`;

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
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [otherActivities, setOtherActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packageType, setpackageType] = useState(null);

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const SUPPORT_PHONE = process.env.REACT_APP_SUPPORT_PHONE || "+918999732703";

  useEffect(() => {
    // Function to set or update meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Description & Keywords
    setMetaTag("name", "description", seo.description);
    setMetaTag("name", "keywords", seo.keywords);

    // Open Graph tags
    setMetaTag("property", "og:title", seo.title);
    setMetaTag("property", "og:description", seo.description);
    setMetaTag("property", "og:image", seo.image);
    setMetaTag("property", "og:url", canonical);

    // Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");

    // Canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", canonical);

    // JSON-LD Structured Data
    const ldJsonScriptId = "structured-data";
    let ldJsonScript = document.getElementById(ldJsonScriptId);
    if (!ldJsonScript) {
      ldJsonScript = document.createElement("script");
      ldJsonScript.type = "application/ld+json";
      ldJsonScript.id = ldJsonScriptId;
      document.head.appendChild(ldJsonScript);
    }
    ldJsonScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: seo.title,
      description: seo.description,
      image: seo.image,
      url: canonical,
      provider: {
        "@type": "TravelAgency",
        name: "Goa Tour Wala",
        url: seoData.default.url,
      },
    });
  }, [seo, canonical]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/api/subcategories/get-by-slug/${subSlug}`)
      .then((res) => {
        setData(res.data);
        setpackageType(res.data.packageType);
      })
      .catch((err) => console.error("Error loading subcategory:", err));
  }, [subSlug]);

  useEffect(() => {
    const fetchOtherActivities = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_BACKEND_URL}/api/categories/all-with-subcategories`
        );
        const categories = response.data;

        // Filter subpackages based on the current packageType
        const matchingSubpackages = categories.flatMap((category) =>
          category.subcategories
            .filter((sub) => sub.packageType === packageType)
            .map((sub) => ({
              ...sub, // Spread existing subpackage details
              categorySlug: category.slug, // Add categorySlug to each subpackage
            }))
        );

        // Shuffle and select 6 random subpackages
        const shuffled = matchingSubpackages.sort(() => 0.5 - Math.random());
        const selectedSubpackages = shuffled.slice(0, 6);

        setOtherActivities(selectedSubpackages);
      } catch (error) {
        console.error("Error fetching other activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOtherActivities();
  }, [packageType]);

  useEffect(() => {
    if (data && activeImageIndex >= data.galleryImages.length) {
      setActiveImageIndex(0);
    }
  }, [data, activeImageIndex]);

  // Auto-slide carousel for gallery images
  useEffect(() => {
    if (!data?.galleryImages?.length) return;
    if (isCarouselHovered || isModalOpen) return; // pause when hovered or modal open

    const intervalId = setInterval(() => {
      setActiveImageIndex(
        (prevIndex) => (prevIndex + 1) % data.galleryImages.length
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [data?.galleryImages?.length, isCarouselHovered, isModalOpen]);

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

  const whatsappNumber = SUPPORT_PHONE.replace(/[^0-9]/g, "").replace(/^0+/,""
  );
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in ${data.name} on ${selectedDate} for ${adults} adult(s) and ${children} child(ren). Here is the link: ${typeof window !== "undefined" ? window.location.href : ""}`
  );
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

  // Carousel controls
  const nextCarouselImage = () => {
    setActiveImageIndex(
      (prevIndex) => (prevIndex + 1) % data.galleryImages.length
    );
  };

  const prevCarouselImage = () => {
    setActiveImageIndex(
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

  const getTruncatedText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
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
    const tripName = data.name;
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
      <Helmet prioritizeSeoTags>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} data-rh="true" />
        <meta name="keywords" content={seo.keywords} data-rh="true" />
        <meta property="og:title" content={seo.title} data-rh="true" />
        <meta
          property="og:description"
          content={seo.description}
          data-rh="true"
        />
        <meta property="og:image" content={seo.image} data-rh="true" />
        <meta property="og:url" content={canonical} data-rh="true" />
        <meta
          name="twitter:card"
          content="summary_large_image"
          data-rh="true"
        />
        <link rel="canonical" href={canonical} data-rh="true" />

        {/* JSON-LD structured data for the page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: seo.title,
            description: seo.description,
            image: seo.image,
            url: canonical,
            provider: {
              "@type": "TravelAgency",
              name: "Goa Tour Wala",
              url: seoData.default.url,
            },
          })}
        </script>
      </Helmet>

      <Header />
      <main className="min-h-screen bg-gray-50 font-sans antialiased">
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

        <div className="max-w-7xl mx-auto px-2 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
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
                  {/* Desktop: full description */}
                  <p className="hidden md:block text-base md:text-lg text-gray-700 mb-4 leading-relaxed drop-shadow-md">
                    {data.description}
                  </p>
                  {/* Mobile: truncated with Read more/less */}
                  <div className="block md:hidden mb-4">
                    <p className="text-base text-gray-700 leading-relaxed drop-shadow-md">
                      {isDescriptionExpanded
                        ? data.description
                        : getTruncatedText(data.description, 450)}
                    </p>
                    {data.description && data.description.length > 450 && (
                      <button
                        type="button"
                        onClick={() => setIsDescriptionExpanded((v) => !v)}
                        className="mt-1 text-blue-700 font-semibold underline underline-offset-2"
                        aria-expanded={isDescriptionExpanded}
                      >
                        {isDescriptionExpanded ? "Read less" : "Read more"}
                      </button>
                    )}
                  </div>
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

                {/* Carousel */}
                <div
                  className="relative w-full h-40 md:h-64 lg:h-80 rounded-lg overflow-hidden shadow-md"
                  onMouseEnter={() => setIsCarouselHovered(true)}
                  onMouseLeave={() => setIsCarouselHovered(false)}
                >
                  <div className="relative w-full h-full">
                    {data.galleryImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        onClick={() => openModal(index)}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out cursor-pointer ${
                          index === activeImageIndex
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Controls */}
                  <button
                    aria-label="Previous"
                    onClick={prevCarouselImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full border border-white/60 bg-white/40 hover:bg-white/60 backdrop-blur-xl text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button
                    aria-label="Next"
                    onClick={nextCarouselImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full border border-white/60 bg-white/40 hover:bg-white/60 backdrop-blur-xl text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-black/20 px-2 py-1 rounded-full">
                    {data.galleryImages.map((_, index) => (
                      <button
                        key={index}
                        aria-label={`Go to slide ${index + 1}`}
                        onClick={() => setActiveImageIndex(index)}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                          index === activeImageIndex
                            ? "bg-white w-6"
                            : "bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Itenary Section */}

            {data.details && data.details.length > 0 && (
              <section className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 border-b-2 md:border-b-3 border-blue-500 pb-2 inline-block">
                  Itenary Included
                </h2>
                <ul className="space-y-2 md:space-y-3">
                  {data.details.map((detail, index) => {
                    const textContent = Array.isArray(detail.content)
                      ? detail.content.join(", ")
                      : detail.content || "";
                    const title = detail.title || "";
                    return (
                      <li
                        key={index}
                        className="flex items-start gap-2 md:gap-3"
                      >
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-gray-800 leading-relaxed">
                          <span className="font-bold">{`${title}`}</span>
                          {`: ${textContent}`}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {/* Highlights Section */}

            {data.features && data.features.length > 0 && (
              <section className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 border-b-2 md:border-b-3 border-blue-500 pb-2 inline-block">
                  Highlights
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-3.5">
                  {data.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 md:gap-3"
                    >
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base font-medium text-gray-800 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Other Activities Section */}

            {otherActivities.length > 0 && (
              <section className="py-8 md:py-12 bg-slate-50">
                <div className="container mx-auto px-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-4">
                    <span style={{ color: "#FFBA0A" }}> Discover</span> Other
                    Activities
                  </h2>
                  <p className="text-center text-lg text-slate-600 mb-8 md:mb-12 max-w-2xl mx-auto">
                    Expand your horizons with our curated selection of unique
                    and exciting experiences.
                  </p>

                  {/* Grid for the activity cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-3 md:gap-2">
                    {otherActivities.map((activity) => (
                      // NEW: Added 'group' to enable hover effects on child elements
                      <div
                        key={activity.slug} // Use a unique slug or id for the key instead of index
                        className="group block bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden"
                      >
                        <Link
                          to={`/${activity.categorySlug}/${activity.slug}`}
                          className="block"
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={activity.galleryImages[0]}
                              alt={activity.name}
                              className="w-full h-44 md:h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                            />
                            {/* NEW: Optional gradient overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          </div>

                          <div className="p-2">
                            <h3 className="text-md font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
                              {activity.name}
                            </h3>

                            {/* NEW: Cleaner styling for the feature tags with truncation */}
                            <div className="mt-3 flex flex-wrap gap-2">
                              {activity.features
                                .slice(0, 3)
                                .map((feature, index) => (
                                  <span
                                    key={index}
                                    className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                                    title={
                                      feature.length > 20 ? feature : undefined
                                    } // Show full text on hover if truncated
                                  >
                                    {feature.length > 20
                                      ? `${feature.slice(0, 20)}...`
                                      : feature}
                                  </span>
                                ))}
                              {activity.features.length > 3 && (
                                <span className="inline-block bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                                  +{activity.features.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
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

        {/* Floating contact actions */}
        <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 shadow-lg transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">WhatsApp</span>
          </a>
          <a
            href={`tel:${SUPPORT_PHONE}`}
            className="group inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 shadow-lg transition-colors"
            aria-label="Call now"
          >
            <Phone className="w-5 h-5" />
            <span className="font-semibold">Call</span>
          </a>
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
                                {paymentStatus.metaInfo.udf1?.split(":")[1] ||
                                  "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Date:</span>
                              <span className="font-medium text-gray-800">
                                {paymentStatus.metaInfo.udf4?.split(":")[1] ||
                                  "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Adults:</span>
                              <span className="font-medium text-gray-800">
                                {paymentStatus.metaInfo.udf5?.split('|')[0].split(":")[1] ||"N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Children:</span>
                              <span className="font-medium text-gray-800">
                                {paymentStatus.metaInfo.udf5?.split('|')[1].split(":")[1] ||"N/A"}
                              </span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2">
                              <span className="text-gray-600">Mobile:</span>
                              <span className="font-medium text-gray-800">
                                {paymentStatus.metaInfo.udf2?.split(":")[1] ||
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
      </main>
      <Footer />
    </>
  );
};

export default SubcategoryPage;
