import React, { useState, useEffect } from "react";
import axios from "axios";

// Icon components for a better UI
const IconUpload = () => (
  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
  </svg>
);

const IconX = () => (
  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
  </svg>
);

const CreatePackage = () => {
  // --- No changes to state management or logic ---
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  // Message state updated to handle type (success/error) for better feedback
  const [message, setMessage] = useState({ text: "", type: "" });

  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    duration: "",
    features: "",
  });

  const [details, setDetails] = useState([{ title: "", content: "" }]);
  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/api/categories/all`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, [REACT_APP_BACKEND_URL]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${REACT_APP_BACKEND_URL}/api/categories/createcategory`, { name: categoryName });
      setMessage({ text: res.data.message, type: "success" });
      setCategoryName("");
      setCategories((prev) => [res.data.category, ...prev]);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Category creation failed", type: "error" });
    }
  };

  const handleCreateSubcategory = async (e) => {
    e.preventDefault();
    if (!form.categoryId) {
        setMessage({ text: "Please select a main category first.", type: "error" });
        return;
    }
    const formData = new FormData();
    formData.append("categoryId", form.categoryId);
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("duration", form.duration);
    formData.append("features", JSON.stringify(form.features.split(",").map(f => f.trim())));
    formData.append("details", JSON.stringify(details));
    if (bannerImageFile) {
      formData.append("bannerImage", bannerImageFile);
    }
    galleryImageFiles.forEach((file) => {
      formData.append("galleryImages", file);
    });

    setUploading(true);
    try {
      const res = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/subcategories/createsubcategory`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUploading(false);
      setMessage({ text: res.data.message, type: "success" });
      // Reset form
      setForm({ categoryId: "", name: "", description: "", price: "", duration: "", features: "" });
      setDetails([{ title: "", content: "" }]);
      setBannerImageFile(null);
      setGalleryImageFiles([]);
    } catch (err) {
      setUploading(false);
      setMessage({ text: err.response?.data?.error || "Subcategory creation failed", type: "error" });
    }
  };

  const handleAddDetail = () => setDetails([...details, { title: "", content: "" }]);

  const handleRemoveDetail = (index) => {
      const updated = details.filter((_, i) => i !== index);
      setDetails(updated);
  };
  
  const handleDetailChange = (index, field, value) => {
    const updated = [...details];
    updated[index][field] = value;
    setDetails(updated);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  // --- UI-related helper styles ---
  const inputStyle = "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring";
  const labelStyle = "text-sm font-medium text-gray-700";

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Create Package</h1>
          <p className="mt-2 text-md text-gray-600">Add new categories and travel packages to your platform.</p>
        </header>

        {/* --- Alert Message --- */}
        {message.text && (
            <div className={`flex items-center justify-between p-4 mb-8 text-sm font-medium rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <span>{message.text}</span>
                <button onClick={() => setMessage({ text: "", type: "" })} className="p-1 rounded-full hover:bg-black/10">
                    <IconX />
                </button>
            </div>
        )}

        {/* --- Create Category Section --- */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Create New Category</h2>
          <p className="text-sm text-gray-500 mb-6">A category holds multiple packages (e.g., "Honeymoon Packages").</p>
          <form onSubmit={handleCreateCategory} className="flex items-start gap-4">
            <input
              type="text"
              placeholder="Enter new category name"
              className={inputStyle + " flex-grow"}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <button type="submit" className="px-6 py-2.5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              Create
            </button>
          </form>
        </div>

        <hr className="my-10 border-gray-200"/>

        {/* --- Create Subcategory (Package) Section --- */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Create New Package</h2>
          <p className="text-sm text-gray-500 mb-8">Fill in the details for the new travel package.</p>
          
          <form onSubmit={handleCreateSubcategory} className="space-y-6">
            {/* --- Basic Info Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="categoryId" className={labelStyle}>Main Category *</label>
                    <select id="categoryId" name="categoryId" value={form.categoryId} onChange={handleFormChange} className={inputStyle} required>
                        <option value="">Select a Category</option>
                        {categories.map((cat) => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                    </select>
                </div>
                <div>
                    <label htmlFor="name" className={labelStyle}>Package Name *</label>
                    <input id="name" name="name" type="text" placeholder="e.g., Manali Winter Trip" value={form.name} onChange={handleFormChange} className={inputStyle} required />
                </div>
                <div>
                    <label htmlFor="price" className={labelStyle}>Price (₹)</label>
                    <input id="price" name="price" type="number" placeholder="e.g., 15000" value={form.price} onChange={handleFormChange} className={inputStyle} />
                </div>
                <div>
                    <label htmlFor="duration" className={labelStyle}>Duration</label>
                    <input id="duration" name="duration" type="text" placeholder="e.g., 5 Days / 4 Nights" value={form.duration} onChange={handleFormChange} className={inputStyle} />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="description" className={labelStyle}>Description</label>
                    <textarea id="description" name="description" placeholder="A brief overview of the package..." value={form.description} onChange={handleFormChange} className={inputStyle + " h-24"} />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="features" className={labelStyle}>Features</label>
                    <input id="features" name="features" type="text" placeholder="Sightseeing, Meals, Accommodation (comma-separated)" value={form.features} onChange={handleFormChange} className={inputStyle} />
                </div>
            </div>

            <hr className="my-4 border-gray-200"/>
            
            {/* --- File Upload Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={labelStyle}>Banner Image</label>
                    <label htmlFor="banner-upload" className="flex flex-col items-center justify-center w-full h-48 mt-2 p-4 text-center bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-400">
                        <IconUpload />
                        <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                        {bannerImageFile ? <span className="text-xs text-blue-600 mt-2">{bannerImageFile.name}</span> : <span className="text-xs text-gray-500 mt-1">PNG, JPG (MAX. 800x400px)</span>}
                    </label>
                    <input id="banner-upload" type="file" className="hidden" accept="image/*" onChange={(e) => setBannerImageFile(e.target.files[0])} />
                </div>
                <div>
                    <label className={labelStyle}>Gallery Images</label>
                     <label htmlFor="gallery-upload" className="flex flex-col items-center justify-center w-full h-48 mt-2 p-4 text-center bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-400">
                        <IconUpload />
                        <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> (multiple)</p>
                        {galleryImageFiles.length > 0 ? <span className="text-xs text-blue-600 mt-2">{galleryImageFiles.length} file(s) selected</span> : <span className="text-xs text-gray-500 mt-1">You can select more than one image</span>}
                    </label>
                    <input id="gallery-upload" type="file" className="hidden" accept="image/*" multiple onChange={(e) => setGalleryImageFiles(Array.from(e.target.files))} />
                </div>
            </div>

            <hr className="my-4 border-gray-200"/>
            
            {/* --- Dynamic Details Section --- */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Package Page Details</h3>
              <p className="text-sm text-gray-500 mb-4">Add sections like 'Itinerary', 'Inclusions', 'Exclusions', etc.</p>
              <div className="space-y-4">
                {details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Title (e.g., Trip Timing)" className={inputStyle} value={detail.title} onChange={(e) => handleDetailChange(index, "title", e.target.value)}/>
                      <input type="text" placeholder="Content (text or comma-separated list)" className={inputStyle} value={detail.content} onChange={(e) => handleDetailChange(index, "content", e.target.value)}/>
                    </div>
                    {details.length > 1 && (
                        <button type="button" onClick={() => handleRemoveDetail(index)} className="p-2 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={handleAddDetail} className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                + Add Detail Section
              </button>
            </div>

            {/* --- Form Submission --- */}
            <div className="flex justify-end pt-4">
              <button type="submit" className="w-full sm:w-auto px-8 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2" disabled={uploading}>
                {uploading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                    </>
                ) : (
                  "Create Package"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePackage;