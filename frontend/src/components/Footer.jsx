import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import footerphoto from "../assets/footerphto2.jpg";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${REACT_APP_BACKEND_URL}/api/categories/all`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error loading footer categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer
      className="bg-white border-t border-gray-200 shadow-inner mt-16 bg-cover bg-center"
      style={{
        backgroundImage: `url(${footerphoto})`,
        backgroundBlendMode: "darken",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-10 text-white">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">GoaTourWala</h2>
          <p className="text-sm text-white mb-4">
            Unforgettable Goa experiences curated just for you. Adventure,
            heritage, and memories – all in one place.
          </p>
          <div className="flex flex-col gap-2 text-sm text-white">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-white" />
              <a
                href="tel:+917709475075"
                className="hover:underline text-white"
              >
                +91 7709475075
              </a>
              <a
                href="tel:+918999732703"
                className="hover:underline text-white"
              >
                +91 8999732703
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-white" />
              <a
                href="mailto:info@goatourwala.in"
                className="hover:underline text-white"
              >
                info@goatourwala.com
              </a>
              <a
                href="mailto:sushil@goatourwala.in"
                className="hover:underline text-white"
              >
                sushil@goatourwala.in
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-white">
                Shop N.7, Marwana Paradyes,Near Green Meddo School Arrais Waddo
                Nagoa Goa,403516 India
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat._id}>
                <Link
                  state={{ categoryId: cat._id }}
                  to={`/explore/${cat.slug}`}
                  className="text-white hover:text-white transition"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Quick Routes*/}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">Quick Navigate</h3>
          <ul className="space-y-2 text-sm text-white">
            
              <li>
                <Link
                  to={`/`}
                  className="text-white hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={`/AboutUs`}
                  className="text-white hover:text-white transition"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to={`/TermsAndConditions`}
                  className="text-white hover:text-white transition"
                >
                  Terms And Conditions
                </Link>
              </li>
              <li>
                <Link
                  to={`/PrivacyPolicy`}
                  className="text-white hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to={`/RefundPolicy`}
                  className="text-white hover:text-white transition"
                >
                  Refund Policy
                </Link>
              </li>
          </ul>
        </div>

        {/* Newsletter / Info */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">Stay Updated</h3>
          <p className="text-sm text-white mb-4">
            Get the latest travel tips, offers, and destinations directly in
            your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-white px-4 py-2 rounded-md hover:bg-white transition text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="text-center  text-sm  border-t border-gray-200">
          &copy; {new Date().getFullYear()} GoaTourWala. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
