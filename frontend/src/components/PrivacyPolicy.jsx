import React from 'react';
import { Shield, Mail, Eye, Lock, Users, FileText, Globe, Baby, RefreshCw, Phone } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <div className="mx-auto pt-5">
      <Header/>
      <div className="text-center mb-8 border-b pb-6 mt-14">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          At Goa Tour Wala ("Company", "we", "us", or "our"), accessible via Website we are committed to protecting your privacy and ensuring a safe experience when you visit our website or use our travel and tour services. This Privacy Policy outlines how we collect, use, store, and protect your personal information.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Section 1 */}
        <section className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Eye className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
          </div>
          <p className="text-gray-700 mb-4">We collect the following types of information:</p>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-800 mb-2">a. Personal Information</h3>
              <p className="text-gray-700 mb-2">When you book a tour or contact us, we may collect:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Travel Dates and Preferences</li>
                <li>Identification documents (if required for bookings)</li>
                <li>Payment Information (processed securely via third-party services)</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-md border-l-4 border-green-500">
              <h3 className="font-semibold text-gray-800 mb-2">b. Automatically Collected Information</h3>
              <p className="text-gray-700 mb-2">When you visit our website, we may collect:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>IP Address</li>
                <li>Browser type</li>
                <li>Pages visited</li>
                <li>Time spent on the site</li>
                <li>Device information</li>
              </ul>
              <p className="text-gray-600 text-sm mt-2 italic">
                This helps us improve user experience and monitor website performance.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
          </div>
          <p className="text-gray-700 mb-4">We use your information to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Process and confirm bookings</li>
            <li>Send booking confirmations and invoices</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Send trip updates, reminders, and service-related communications</li>
            <li>Improve our website and marketing strategies</li>
            <li>Comply with legal or regulatory requirements</li>
          </ul>
          <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded">
            <p className="text-gray-800 font-medium">
              We do not sell or rent your personal information to third parties.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">3. Sharing Your Information</h2>
          </div>
          <p className="text-gray-700 mb-4">
            We may share your information with trusted third-party partners only when necessary, such as:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
            <li>Hotel providers, cab operators, and local tour partners</li>
            <li>Payment processors and financial institutions</li>
            <li>Government authorities (if required for travel documentation)</li>
          </ul>
          <p className="text-gray-700 italic">
            All partners are expected to protect your information and use it solely to fulfill the services requested.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Lock className="w-6 h-6 text-red-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">4. Data Security</h2>
          </div>
          <p className="text-gray-700">
            We implement standard industry practices to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission or storage system is 100% secure, and we cannot guarantee absolute protection.
          </p>
        </section>

        {/* Section 5 */}
        <section className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Globe className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">5. Cookies</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Our website may use cookies to enhance your experience. Cookies help us remember your preferences, monitor traffic, and understand user behavior.
          </p>
          <p className="text-gray-700">
            You can disable cookies in your browser settings, though some features of the website may not function properly.
          </p>
        </section>

        {/* Section 6 */}
        <section className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">6. Your Rights</h2>
          </div>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
            <li>Access or correct your personal data</li>
            <li>Request deletion of your information (unless legally required to retain it)</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>
          <p className="text-gray-700">
            To exercise your rights, please contact us at{' '}
            <a href="mailto:info@goatourwala.com" className="text-blue-600 hover:underline font-medium">
              info@goatourwala.com
            </a>.
          </p>
        </section>

        {/* Sections 7-9 */}
        <div className="grid md:grid-cols-3 gap-6">
          <section className="bg-orange-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-orange-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">7. Third-Party Links</h2>
            </div>
            <p className="text-gray-700 text-sm">
              Our website may contain links to external websites. We are not responsible for the privacy practices or content of those third-party sites.
            </p>
          </section>

          <section className="bg-pink-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Baby className="w-6 h-6 text-pink-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">8. Children's Privacy</h2>
            </div>
            <p className="text-gray-700 text-sm">
              Our services are not intended for children under the age of 13. We do not knowingly collect personal information from minors.
            </p>
          </section>

          <section className="bg-indigo-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <RefreshCw className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">9. Policy Updates</h2>
            </div>
            <p className="text-gray-700 text-sm">
              We may update this Privacy Policy from time to time. All changes will be posted on this page with an updated effective date. Continued use of our services implies acceptance of the revised policy.
            </p>
          </section>
        </div>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 mr-3" />
            <h2 className="text-2xl font-semibold">10. Contact Us</h2>
          </div>
          <p className="mb-4">For any privacy-related questions or concerns, please contact us:</p>
          <div className="flex items-center justify-center space-x-2">
            <Mail className="w-5 h-5" />
            <span className="font-medium">Email:</span>
            <a 
              href="mailto:info@goatourwala.com" 
              className="underline hover:text-blue-200 transition-colors"
            >
              info@goatourwala.com
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;