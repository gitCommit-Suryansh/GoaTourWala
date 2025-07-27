<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCategories.map((category) => (
              <Link
                key={category._id}
                to={`/${category.categorySlug}/${category.slug}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                style={{ scale: 0.9 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      category.image ||
                      category.bannerImage ||
                      "/api/placeholder/400/300"
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
                      {category.route || "Srinagar • Pahalgam • Srinagar"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        {subcategoryStats[category._id]?.rating || "4.5"}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({subcategoryStats[category._id]?.reviews || "1200"}{" "}
                      reviews)
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg text-gray-400 line-through">
                        INR{" "}
                        {category.price +
                          (subcategoryStats[category._id]?.discount || 1000)}
                      </span>
                      <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                        SAVE INR{" "}
                        {subcategoryStats[category._id]?.discount || 1000}
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
                    <button className="flex-1 bg-white border border-orange-500 text-orange-500 py-2 px-4 rounded-lg font-medium hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button
                      className="flex-1 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                      style={{ backgroundColor: "#F37002" }}
                    >
                      Request Callback
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>