import React from 'react';
import { MapPin, Heart, Award, DollarSign, Globe, Users, Camera, Compass, Star, Shield, CheckCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const AboutUs = () => {
  const stats = [
    { number: '10,000+', label: 'Happy Travelers', icon: Users },
    { number: '500+', label: 'Tours Completed', icon: MapPin },
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '24/7', label: 'Customer Support', icon: Shield }
  ];

  const features = [
    {
      icon: DollarSign,
      title: 'Competitive Pricing',
      description: 'We believe that memorable travel experiences shouldn\'t come with a hefty price tag. That\'s why we\'re committed to offering competitive pricing without compromising on quality or service.',
      color: 'green'
    },
    {
      icon: Award,
      title: 'Award-Winning Service',
      description: 'We\'re proud to have been honored with prestigious awards for our commitment to excellence in service and customer satisfaction. These accolades are a testament to our dedication to providing you with the best possible travel experience.',
      color: 'blue'
    },
    {
      icon: Globe,
      title: 'Worldwide Coverage',
      description: 'We believe that the world is meant to be explored, and we\'re here to help you do just that. With our extensive worldwide coverage, the possibilities for your next adventure are endless.',
      color: 'purple'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'Every destination tells a story, and we\'re here to help you discover yours.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction and safety are our top priorities in every journey we craft.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'We maintain the highest standards in accommodations, transportation, and experiences.'
    },
    {
      icon: Compass,
      title: 'Expert Guidance',
      description: 'Our local expertise ensures you discover both popular attractions and hidden gems.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
        <Header/>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-white opacity-5 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white opacity-5 rounded-full"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="flex items-center justify-center mb-6">
            <MapPin className="w-12 h-12 mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold">About Us</h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover the world with Goa Tour Wala - where every journey becomes an unforgettable story
          </p>
          <div className="mt-8 flex items-center justify-center space-x-2">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-lg">Trusted by thousands of travelers</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Heart className="w-8 h-8 text-red-500 mr-3" />
                <h2 className="text-4xl font-bold text-gray-800">Our Story</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <strong>Embark on a Journey with Us</strong> - At <strong>Goa Tour Wala</strong>, we don't just organize trips; we curate experiences that linger in your memory long after you've returned home.
                </p>
                <p>
                  Our story began with a passion for exploration and a deep-rooted love for <strong>Goa's enchanting landscapes</strong>. What started as a small dream has blossomed into a trusted travel companion for thousands of adventurers.
                </p>
                <p>
                  From the golden beaches of North Goa to the serene backwaters of the South, from the bustling markets of Panaji to the tranquil churches of Old Goa, we've been crafting personalized journeys that capture the true essence of this coastal paradise.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-8 shadow-lg">
                <Camera className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Creating Memories Since 2009</h3>
                  <p className="text-gray-700">
                    Every sunset viewed, every local dish savored, and every cultural experience shared becomes a cherished memory in your travel story.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Compass className="w-8 h-8 text-teal-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              At <strong>Goa Tour Wala</strong>, our mission is to immerse travelers in the vibrant tapestry of Goa's culture, heritage, and natural beauty. We believe that every journey should be an exploration of the senses, a celebration of diversity, and an opportunity for personal growth.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">We Strive To:</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-teal-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Inspire Wonder</h4>
                  <p className="text-gray-600 text-sm">Awaken your sense of adventure and curiosity about the world</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Connect Cultures</h4>
                  <p className="text-gray-600 text-sm">Bridge the gap between travelers and local communities</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Foster Growth</h4>
                  <p className="text-gray-600 text-sm">Create transformative experiences that expand horizons</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Goa Tour Wala</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what sets us apart in creating extraordinary travel experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const colorClasses = {
                green: 'from-green-500 to-emerald-600 text-white',
                blue: 'from-blue-500 to-cyan-600 text-white',
                purple: 'from-purple-500 to-indigo-600 text-white'
              };
              
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className={`bg-gradient-to-br ${colorClasses[feature.color]} p-6 text-center`}>
                    <IconComponent className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide every journey we create
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Promise Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Promise to You</h2>
          <p className="text-xl leading-relaxed mb-8">
            When you choose Goa Tour Wala, you're not just booking a trip – you're investing in memories that will last a lifetime. Our dedicated team of travel experts, local guides, and customer service professionals work tirelessly to ensure every aspect of your journey exceeds expectations.
          </p>
          <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-300" />
                <h3 className="font-bold mb-2">Personalized Experiences</h3>
                <p className="text-blue-100 text-sm">Every itinerary is crafted to match your unique preferences and travel style</p>
              </div>
              <div>
                <Shield className="w-12 h-12 mx-auto mb-4 text-green-300" />
                <h3 className="font-bold mb-2">Safety & Security</h3>
                <p className="text-blue-100 text-sm">Your safety is our priority with vetted partners and 24/7 support</p>
              </div>
              <div>
                <Heart className="w-12 h-12 mx-auto mb-4 text-green-300" />
                <h3 className="font-bold mb-2">Memorable Moments</h3>
                <p className="text-blue-100 text-sm">We create those special moments that make your trip truly unforgettable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Your Goa Adventure?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let us craft your perfect Goa experience. From pristine beaches to cultural treasures, your dream vacation awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/PlanYourTrip" className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Plan Your Trip
            </Link>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
              Contact Us Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default AboutUs;