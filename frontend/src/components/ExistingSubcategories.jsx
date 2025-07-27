import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Edit,
  X,
  DollarSign,
  IndianRupee,
  Clock,
  Star,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Trash,
} from "lucide-react";
const ExistingSubcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newBannerImage, setNewBannerImage] = useState(null);
  const [newGalleryImages, setNewGalleryImages] = useState([]);
  const REACT_APP_BACKEND_URL=process.env.REACT_APP_BACKEND_URL

  
  
  const fetchSubcategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/subcategories/all`
      );
      setSubcategories(res.data.subcategories);
    } catch (err) {
      console.error("Failed to load subcategories", err);
      setMessage("Failed to load subcategories. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleOpenModal = (sub) => {
    setSelected({
      ...sub,
      features: sub.features ? sub.features.join(", ") : "",
      details: sub.details
        ? sub.details.map((d) => ({
            title: d.title || "",
            content: Array.isArray(d.content)
              ? d.content.join(", ")
              : d.content || "",
          }))
        : [],
    });
    setNewBannerImage(null);
    setNewGalleryImages([]);
    setShowModal(true);
  };

  const handleRemoveDetail = (index) => {
    const updated = [...selected.details];
    updated.splice(index, 1);
    setSelected({ ...selected, details: updated });
  };

  const handleRemoveGalleryImage = (index) => {
    const updated = [...selected.galleryImages];
    updated.splice(index, 1);
    setSelected({ ...selected, galleryImages: updated });
  };

  // const handleUpdate = async () => {
  //   setIsUpdating(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", selected.name);
  //     formData.append("description", selected.description || "");
  //     formData.append("price", selected.price || 0);
  //     formData.append("duration", selected.duration || "");
  //     formData.append(
  //       "features",
  //       JSON.stringify(
  //         selected.features
  //           ? selected.features
  //               .split(",")
  //               .map((f) => f.trim())
  //               .filter(Boolean)
  //           : []
  //       )
  //     );
  //     formData.append("details", JSON.stringify(selected.details));
  //     formData.append("galleryImages", JSON.stringify(selected.galleryImages));

  //     if (newBannerImage) {
  //       formData.append("bannerImage", newBannerImage);
  //     }
  //     newGalleryImages.forEach((img) => {
  //       formData.append("newGalleryImages", img);
  //     });

  //     const res = await axios.put(
  //       `${REACT_APP_BACKEND_URL}/api/subcategories/update/${selected._id}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     setMessage(res.data.message || "Subcategory updated successfully!");
  //     setShowModal(false);
  //     fetchSubcategories();
  //     setTimeout(() => setMessage(""), 3000);
  //   } catch (err) {
  //     console.error("Update failed:", err);
  //     setMessage(
  //       err.response?.data?.error || "Update failed. Please try again."
  //     );
  //     setTimeout(() => setMessage(""), 3000);
  //   } finally {
  //     setIsUpdating(false);
  //   }
  // };

 // ======= ✅ FRONTEND FINAL VERSION (React) =======

const handleUpdate = async () => {
  setIsUpdating(true);
  try {
    const formData = new FormData();

    formData.append("name", selected.name);
    formData.append("description", selected.description || "");
    formData.append("price", selected.price || 0);
    formData.append("duration", selected.duration || "");

    formData.append(
      "features",
      JSON.stringify(
        selected.features
          ? selected.features.split(",").map((f) => f.trim()).filter(Boolean)
          : []
      )
    );

    formData.append("details", JSON.stringify(selected.details));
    formData.append("galleryImages", JSON.stringify(selected.galleryImages)); // existing URLs to retain

    if (newBannerImage instanceof File) {
      formData.append("bannerImage", newBannerImage);
    }

    const uniqueGalleryFiles = Array.from(new Set(newGalleryImages));
    uniqueGalleryFiles.forEach((file) => {
      if (file instanceof File) {
        formData.append("newGalleryImages", file);
      }
    });

    const res = await axios.put(
      `${REACT_APP_BACKEND_URL}/api/subcategories/update/${selected._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setMessage(res.data.message || "Subcategory updated successfully!");
    setShowModal(false);
    fetchSubcategories();
    setTimeout(() => setMessage(""), 3000);
  } catch (err) {
    console.error("Update failed:", err);
    setMessage(err.response?.data?.error || "Update failed. Please try again.");
    setTimeout(() => setMessage(""), 3000);
  } finally {
    setIsUpdating(false);
  }
};

  

  if (loading && subcategories.length === 0) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-10 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 shadow-md border border-gray-100"
              >
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="mt-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10">
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
            Service Subcategories
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and edit your service offerings with ease
          </p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mb-8 p-5 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center space-x-3 ${
              message.includes("successfully")
                ? "bg-emerald-100 border-l-4 border-emerald-500 text-emerald-800"
                : "bg-red-100 border-l-4 border-red-500 text-red-800"
            }`}
          >
            <div className="flex-shrink-0">
              {message.includes("successfully") ? (
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
            <p className="font-medium text-lg">{message}</p>
          </div>
        )}

        {/* Subcategories Grid */}
        {subcategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subcategories.map((sub) => (
              <div
                key={sub._id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
                onClick={() => handleOpenModal(sub)}
              >
                {/* Banner Image */}
                {sub.bannerImage && (
                  <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={sub.bannerImage}
                      alt={sub.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Active/Inactive Badge */}
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        sub.active
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {sub.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                )}

                <div className="p-7">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">
                      {sub.name}
                    </h3>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 ml-4">
                      <Edit className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-5 line-clamp-3 leading-relaxed text-base">
                    {sub.description?.slice(0, 120)}
                    {sub.description?.length > 120 ? "..." : ""}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-emerald-700 font-medium">
                        <IndianRupee className="w-5 h-5 mr-2" />{" "}
                        {/* Changed to IndianRupee */}
                        <span className="text-lg">₹{sub.price}</span>{" "}
                        {/* Changed to Rupee symbol */}
                      </div>
                      <div className="flex items-center text-blue-700 font-medium">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className="text-base">{sub.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-amber-700 font-medium">
                        <Star className="w-5 h-5 mr-2" />
                        <span className="text-base">
                          {sub.features?.length || 0} features
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-700 transition-colors transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center text-gray-600 text-xl py-10">
              No subcategories found.
            </div>
          )
        )}

        {/* Enhanced Edit Modal */}
        {showModal && selected && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex **items-center** justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col">
              {/* Modal Header */}
              <div className="flex-shrink-0 bg-white border-b border-gray-200 px-8 py-5 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Edit Subcategory
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                    disabled={isUpdating}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body - scrollable */}
              <div className="flex-grow overflow-y-auto px-6 py-6 space-y-4">
              <p className="font-medium mb-1">Package Title</p>
                <input
                  className="w-full border p-2"
                  value={selected.name}
                  onChange={(e) =>
                    setSelected({ ...selected, name: e.target.value })
                  }
                />
                <p className="font-medium mb-1">Package Description</p>
                <textarea
                  className="w-full border p-2"
                  value={selected.description || ""}
                  onChange={(e) =>
                    setSelected({ ...selected, description: e.target.value })
                  }
                />
                <p className="font-medium mb-1">Package prize / Person</p>

                <input
                  type="number"
                  className="w-full border p-2"
                  value={selected.price || ""}
                  onChange={(e) =>
                    setSelected({ ...selected, price: e.target.value })
                  }
                />
                <p className="font-medium mb-1">Package Duration</p>

                <input
                  className="w-full border p-2"
                  value={selected.duration || ""}
                  onChange={(e) =>
                    setSelected({ ...selected, duration: e.target.value })
                  }
                />
                <p className="font-medium mb-1">Features</p>

                <input
                  className="w-full border p-2"
                  value={selected.features || ""}
                  onChange={(e) =>
                    setSelected({ ...selected, features: e.target.value })
                  }
                />

                {/* Banner Image Upload */}
                <div>
                  <p className="font-medium mb-1">Replace Banner Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewBannerImage(e.target.files[0])}
                  />
                </div>

                {/* Gallery Images */}
                <div>
                  <p className="font-medium mb-2">Gallery Images</p>
                  <div className="flex flex-wrap gap-4">
                    {selected.galleryImages?.map((url, i) => (
                      <div key={i} className="relative">
                        <img
                          src={url}
                          alt={`img-${i}`}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <button
                          onClick={() => handleRemoveGalleryImage(i)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setNewGalleryImages(Array.from(e.target.files))
                    }
                    className="mt-2"
                  />
                </div>

                {/* Details with delete option */}
                <div className="space-y-3">
                  <p className="font-semibold text-lg">Details</p>
                  {selected.details?.map((d, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-3 gap-2 items-center"
                    >
                      <input
                        value={d.title}
                        className="border p-2"
                        onChange={(e) => {
                          const upd = [...selected.details];
                          upd[i].title = e.target.value;
                          setSelected({ ...selected, details: upd });
                        }}
                      />
                      <input
                        value={d.content}
                        className="border p-2 col-span-2"
                        onChange={(e) => {
                          const upd = [...selected.details];
                          upd[i].content = e.target.value;
                          setSelected({ ...selected, details: upd });
                        }}
                      />
                      <button
                        onClick={() => handleRemoveDetail(i)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  onClick={handleUpdate}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Subcategory"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExistingSubcategories;
