// src/seoData.js
const BASE_URL = "https://goatourwala.com"; // <-- replace with your real domain in production
const IMG_BASE = `${BASE_URL}/assets/images/seo`; // host images here (or CDN)

const seoData = {
  default: {
    title: "Goa Tour Wala - Explore Goa's Best Tours & Adventures",
    description:
      "Goa Tour Wala: cruises, water sports, sightseeing, nature trips and tailor-made packages. Book authentic Goa experiences today.",
    keywords:
      "Goa tours, Goa travel packages, cruises in Goa, water sports Goa, Goa sightseeing",
    image: `${IMG_BASE}/default.webp`,
    url: `${BASE_URL}`,
  },

  // Cruises
  "adventure-cruise": {
    title: "Adventure Cruise in Goa | Goa Tour Wala",
    description:
      "Experience adrenaline-packed adventure cruises in Goa with water sports, music and local snacks. Safe, fun and family-friendly.",
    keywords: "adventure cruise Goa, Goa adventure cruise, cruise with watersports",
    image: `${IMG_BASE}/adventure-cruise.webp`,
    url: `${BASE_URL}/cruise-in-goa/adventure-cruise`,
  },

  "adventure-cruise-with-watersports": {
    title: "Adventure Cruise with Water Sports | Goa Tour Wala",
    description:
      "Combine a scenic cruise with thrilling water sports (jet-ski, banana ride, parasailing). Packages for couples and groups.",
    keywords: "cruise with watersports Goa, water sports cruise Goa, Goa combo cruise",
    image: `${IMG_BASE}/adventure-cruise-with-watersports.webp`,
    url: `${BASE_URL}/cruise-in-goa/adventure-cruise-with-watersports`,
  },

  "dinner-cruise": {
    title: "Dinner Cruise in Goa | Romantic & Group Cruises",
    description:
      "Enjoy an evening dinner cruise in Goa — live music, dinner buffet, and sunset views. Perfect for date nights and parties.",
    keywords: "dinner cruise Goa, romantic cruise Goa, evening cruise Goa",
    image: `${IMG_BASE}/dinner-cruise.webp`,
    url: `${BASE_URL}/cruise-in-goa/dinner-cruise`,
  },

  "sunset-cruise": {
    title: "Sunset Cruise in Goa | Best Sundowner Experiences",
    description:
      "Watch the sun sink over Goan waters on our sunset cruises. Great for couples, photographers and chill evenings.",
    keywords: "sunset cruise Goa, sundowner cruise Goa, best sunset cruise",
    image: `${IMG_BASE}/sunset-cruise.webp`,
    url: `${BASE_URL}/cruise-in-goa/sunset-cruise`,
  },

  "yacht-on-rent": {
    title: "Yacht on Rent in Goa | Private Yacht Charters",
    description:
      "Rent a private yacht in Goa for parties, corporate events or romantic escapes. Professionally crewed yachts with catering.",
    keywords: "yacht rental Goa, rent a yacht Goa, private yacht Goa",
    image: `${IMG_BASE}/yacht-on-rent.webp`,
    url: `${BASE_URL}/cruise-in-goa/yacht-on-rent`,
  },

  "cruise-on-rent": {
    title: "Cruise on Rent in Goa | Private Cruise Hire",
    description:
      "Hire a private cruise for celebrations and group tours. Customized itineraries, food and entertainment available.",
    keywords: "private cruise Goa, cruise rental Goa, hire cruise Goa",
    image: `${IMG_BASE}/cruise-on-rent.webp`,
    url: `${BASE_URL}/cruise-in-goa/cruise-on-rent`,
  },

  // Sightseeing
  "north-goa-sightseen": {
    title: "North Goa Sightseeing Tours | Beaches & Nightlife",
    description:
      "Explore North Goa's beaches, forts and nightlife with local guides. Flexible half-day and full-day tours.",
    keywords: "north goa sightseeing, north goa tours, goa beach tours north",
    image: `${IMG_BASE}/north-goa-sightseen.webp`,
    url: `${BASE_URL}/sightseen/north-goa-sightseen`,
  },

  "south-goa-sightseen": {
    title: "South Goa Sightseeing | Tranquil Beaches & Heritage",
    description:
      "Discover peaceful South Goa beaches, Portuguese heritage sites and scenic coastal drives. Ideal for couples and families.",
    keywords: "south goa sightseeing, south goa tours, goa heritage tours",
    image: `${IMG_BASE}/south-goa-sightseen.webp`,
    url: `${BASE_URL}/sightseen/south-goa-sightseen`,
  },

  "dolphin-sightseen-tour": {
    title: "Dolphin Sightseeing Tours in Goa | Morning & Sunset",
    description:
      "See dolphins in their natural habitat with our dolphin-watching boat trips. Safe boats and experienced crews.",
    keywords: "dolphin trip Goa, dolphin watching Goa, dolphin sightseeing Goa",
    image: `${IMG_BASE}/dolphin-sightseen-tour.webp`,
    url: `${BASE_URL}/sightseen/dolphin-sightseen-tour`,
  },

  // Water sports / adventure
  "scuba-diving": {
    title: "Scuba Diving in Goa | Grand Island & Malvan Trips",
    description:
      "Dive into Goa’s underwater world — certified instructors, Grand Island and Malvan scuba trips. Beginner-friendly courses too.",
    keywords: "scuba diving Goa, Grand Island scuba, scuba courses Goa, Malvan scuba",
    image: `${IMG_BASE}/scuba-diving.webp`,
    url: `${BASE_URL}/adventure-sports/scuba-diving`,
  },
  "watersports": {
    title: "Water Sports in Goa | Parasailing, Jet Ski, Banana Ride & More",
    description:
      "Experience the thrill of Goa’s top water sports — parasailing, jet ski, banana boat rides, bumper rides, and more. Safe, fun, and perfect for all adventure lovers.",
    keywords: "water sports Goa, parasailing Goa, jet ski Goa, banana ride Goa, adventure sports Goa",
    image: `${IMG_BASE}/watersports.webp`,
    url: `${BASE_URL}/adventure-sports/watersports`,
},


  "flyboarding": {
    title: "Flyboarding in Goa | High-Flying Water Adventure",
    description:
      "Try flyboarding in Goa — thrilling water-propelled boards with trained instructors and safety gear provided.",
    keywords: "flyboarding Goa, water flyboard Goa, flyboard Goa",
    image: `${IMG_BASE}/flyboarding.webp`,
    url: `${BASE_URL}/adventure-sports/flyboarding`,
  },

  "bungee-jumping": {
    title: "Bungee Jumping Near Goa | Thrill-Seeker Adventures",
    description:
      "Experience high-adrenaline bungee jumps near Goa with certified operators and strict safety protocols.",
    keywords: "bungee jumping Goa, bungee near Goa, adventure sports Goa",
    image: `${IMG_BASE}/bungee-jumping.webp`,
    url: `${BASE_URL}/adventure-sports/bungee-jumping`,
  },

  "dudhsagar-waterfall-tour": {
    title: "Dudhsagar Waterfall Trip | Waterfall & Jeep Safari",
    description:
      "Day trips to Dudhsagar waterfall with jeep safaris, trekking options and scenic views. Best visited after monsoon.",
    keywords: "Dudhsagar trip, Dudhsagar waterfall Goa, Dudhsagar jeep safari",
    image: `${IMG_BASE}/dudhsagar-waterfall-tour.webp`,
    url: `${BASE_URL}/adventure-sports/dudhsagar-waterfall-tour`,
  },

  "crocodile-trip-in-goa": {
    title: "Crocodile Trip in Goa | River & Backwater Excursions",
    description:
      "Explore Goa’s backwaters and spot crocodiles with guided boat trips and nature commentary from local experts.",
    keywords: "crocodile trip Goa, backwater trips Goa, wildlife boat tour Goa",
    image: `${IMG_BASE}/crocodile-trip-in-goa.webp`,
    url: `${BASE_URL}/adventure-sports/crocodile-trip-in-goa`,
  },

  "scuba-combo-tour-at-grand-island": {
    title: "Scuba Combo Tour - Grand Island | Dive + Water Sports",
    description:
      "Combo packages to Grand Island: scuba diving plus snorkeling and water sports. Perfect for adventure-packed days.",
    keywords: "Grand Island scuba combo, scuba + watersports Goa, Grand Island tour",
    image: `${IMG_BASE}/scuba-combo-tour-at-grand-island.webp`,
    url: `${BASE_URL}/scuba-with-watersports/scuba-combo-tour-at-grand-island`,
  },

  "scuba-with-watersports-at-malvan": {
    title: "Scuba & Water Sports at Malvan | Day Trips from Goa",
    description:
      "Malvan scuba trips with combo water sports — ideal for divers and thrill seekers. Includes boat transfer and equipment.",
    keywords: "Malvan scuba, Malvan water sports, scuba Malvan Goa",
    image: `${IMG_BASE}/scuba-with-watersports-at-malvan.webp`,
    url: `${BASE_URL}/scuba-with-watersports/scuba-with-watersports-at-malvan`,
  },

  // Packages
  "goa-honeymoon-package": {
    title: "Goa Honeymoon Packages | Romantic Getaways",
    description:
      "Curated honeymoon packages in Goa — private dinners, sunset cruises, couple spa sessions and romantic stays.",
    keywords: "honeymoon package Goa, romantic Goa package, couple package Goa",
    image: `${IMG_BASE}/goa-honeymoon-package.webp`,
    url: `${BASE_URL}/tour-packages/goa-honeymoon-package`,
  },

  "goa-tour-packages": {
    title: "Goa Tour Packages | Custom & Group Tours",
    description:
      "Complete Goa tour packages for families, couples and corporate groups. Tailor itineraries and budget options available.",
    keywords: "Goa tour packages, Goa holiday packages, custom Goa tours",
    image: `${IMG_BASE}/goa-tour-packages.webp`,
    url: `${BASE_URL}/tour-packages/goa-tour-packages`,
  },

  "business-tour-package": {
    title: "Business Tour Packages | Corporate Travel Goa",
    description:
      "Corporate travel and business tour packages in Goa — logistics, meeting spaces and team activities included.",
    keywords: "business tour Goa, corporate travel Goa, corporate packages Goa",
    image: `${IMG_BASE}/business-tour-package.webp`,
    url: `${BASE_URL}/tour-packages/business-tour-package`,
  },

  "family-tour-package": {
    title: "Family Tour Packages in Goa | Kid-Friendly Holidays",
    description:
      "Family-friendly Goa packages with sightseeing, easy activities and safe transfers. Fun for all ages and budgets.",
    keywords: "family tour Goa, family package Goa, kid-friendly Goa",
    image: `${IMG_BASE}/family-tour-package.webp`,
    url: `${BASE_URL}/tour-packages/family-tour-package`,
  },

  "adventure-tour-package": {
    title: "Adventure Tour Packages | Goa Adrenaline Trips",
    description:
      "Adventure tour packages featuring bungee, scuba, flyboarding, buggy rides and more across Goa's top spots.",
    keywords: "adventure package Goa, adventure tours Goa, thrill packages Goa",
    image: `${IMG_BASE}/adventure-tour-package.webp`,
    url: `${BASE_URL}/tour-packages/adventure-tour-package`,
  },

  "goa-hampi-tour": {
    title: "Goa to Hampi Tours | Heritage & Adventure",
    description:
      "Combined Goa & Hampi itineraries for history lovers — temples, ruins and scenic drives with expert guides.",
    keywords: "Goa Hampi tour, Hampi from Goa, Hampi package Goa",
    image: `${IMG_BASE}/goa-hampi-tour.webp`,
    url: `${BASE_URL}/tour-packages/goa-hampi-tour`,
  },

  "goa-murudeshwar": {
    title: "Goa to Murudeshwar | Temple & Coastal Tours",
    description:
      "Guided tours from Goa to Murudeshwar — see the iconic temple, coastal views and local culture on day trips.",
    keywords: "Murudeshwar tour Goa, Goa Murudeshwar trip, Murudeshwar from Goa",
    image: `${IMG_BASE}/goa-murudeshwar.webp`,
    url: `${BASE_URL}/tour-packages/goa-murudeshwar`,
  },

  "wildernest-nature-trip": {
    title: "Wildernest Nature Trip | Eco & Wildlife Adventures",
    description:
      "Wildernest nature trips: bird watching, guided forest walks, and eco-friendly stays. Ideal for nature lovers.",
    keywords: "Wildernest Goa, nature trip Goa, eco tour Goa, bird watching Goa",
    image: `${IMG_BASE}/wildernest-nature-trip.webp`,
    url: `${BASE_URL}/tour-packages/wildernest-nature-trip`,
  },

  "houseboat": {
    title: "Houseboat Stay in Goa | Backwater & Luxury Houseboats",
    description:
      "Relax on a houseboat in Goa with scenic backwaters, local cuisine and comfortable stays. Options from budget to luxury.",
    keywords: "houseboat Goa, houseboat stay Goa, backwater houseboat Goa",
    image: `${IMG_BASE}/houseboat.webp`,
    url: `${BASE_URL}/tour-packages/houseboat`,
  },
};

export default seoData;
