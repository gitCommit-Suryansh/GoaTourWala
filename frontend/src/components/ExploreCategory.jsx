import React, { useEffect, useState } from "react";
import { useLocation ,useParams} from "react-router-dom";
import { MapPin, Star, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "./Header";

const ExploreCategory = () => {
  const location = useLocation();
  const {slug}=useParams();
  const categoryId = location.state?.categoryId;
  console.log(categoryId)

  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (!categoryId) return;

    const fetchSubcategories = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${REACT_APP_BACKEND_URL}/api/subcategories/${categoryId}`
        );
        const data = await res.json();
        console.log(data)

        if (data) {
          setSubcategories(data);

          // Generate random stats
          const newStats = {};
          data.forEach((sub) => {
            const discount = (Math.floor(Math.random() * 8) + 8) * 100;
            newStats[sub._id] = {
              rating: (Math.random() * (4.8 - 4.1) + 4.1).toFixed(1),
              reviews: Math.floor(Math.random() * (2400 - 1100 + 1) + 1100),
              discount,
            };
          });
          setStats(newStats);
        } else {
          setSubcategories([]);
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  if (!categoryId) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold text-xl">
        ❌ No category ID found. Please navigate here using the proper link.
      </div>
    );
  }

  return (
    <>
    <Header/>
    <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Explore Trips under{" "}
          <span className="text-[#F37002]  decoration-wavy decoration-2" style={{color:"#F37002"}}>
            {slug}
          </span>
        </h2>

        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading...</div>
        ) : subcategories.length === 0 ? (
          <div className="text-center text-lg text-gray-500">
            No Trips found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {subcategories.map((category) => (
              <Link
                key={category._id}
                to={`/${slug}/${category.slug}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shado   w-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                style={{ scale: 0.9 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      category.image ||
                      category.bannerImage ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="text-sm text-gray-600 mb-2">
                    {category.duration || "6 days & 5 nights"}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {category.name}
                  </h3>

                  <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {category.route || "Goa"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        {stats[category._id]?.rating || "4.5"}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({stats[category._id]?.reviews || "1200"} reviews)
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg text-gray-400 line-through">
                        INR{" "}
                        {category.price +
                          (stats[category._id]?.discount || 1000)}
                      </span>
                      <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                        SAVE INR {stats[category._id]?.discount || 1000}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        INR {category.price}
                      </span>
                      <span className="text-sm text-gray-600">/Adult</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href="tel:+1234567890"
                      className="flex-1 bg-white border border-orange-500 text-orange-500 py-2 px-4 rounded-lg font-medium hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <button
                      className="flex-1 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                      style={{ backgroundColor: "#F37002" }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section></>
  );
};

export default ExploreCategory;
