import React from 'react';
import { FileText, Mail, MapPin, CreditCard, XCircle, DollarSign, Users, AlertTriangle, Shield, Copyright, Scale, Phone } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const TermsAndConditions = () => {
  return (
    <div className="mx-auto pt-5">
      <Header/>
      <div className="text-center mb-8 border-b p-3 mt-14">
        <div className="flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Terms and Conditions</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
          Welcome to Goa Tour Wala ("Company", "we", "us", or "our"). These Terms and Conditions ("Terms") govern your use of our website and services provided by direct communication via email, phone, or in person.
        </p>
        <p className="text-gray-700 font-medium">
          By accessing our site or booking services with us, you agree to these Terms. If you do not agree, please refrain from using our services.
        </p>
        <div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-500 rounded inline-block">
          <p className="text-blue-800 font-medium">
            This Website is managed by Shree Shyam Holidays
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Section 1 */}
        <section className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">1. Services Offered</h2>
          </div>
          <p className="text-gray-700 mb-4">We provide the following services:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Customized and fixed Goa tour packages</li>
            <li>Hotel/accommodation bookings</li>
            <li>Cab rentals and local transportation</li>
            <li>Adventure activities and sightseeing</li>
            <li>Group and corporate travel solutions</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">2. Booking & Payment</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">All bookings must be confirmed in writing (email, form, or WhatsApp).</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">A minimum advance payment is required to confirm your booking.</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">Full payment must be made before the start of the tour unless otherwise agreed.</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">Payment can be made via UPI, bank transfer, credit/debit card, or approved online portals.</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <XCircle className="w-6 h-6 text-red-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">3. Cancellations & Refunds</h2>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700">Please refer to our Refund & Cancellation Policy for complete details.</p>
            <div className="bg-white p-4 rounded-md border-l-4 border-red-500">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Cancellations must be made in writing and are subject to applicable fees.</li>
                <li className="font-medium text-red-700">No-shows or last-minute cancellations are non-refundable.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <DollarSign className="w-6 h-6 text-yellow-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">4. Pricing & Inclusions</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">All prices are quoted in INR (Indian Rupees) and are subject to change without prior notice.</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">Package inclusions and exclusions are clearly mentioned at the time of booking.</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">Prices may vary based on seasonality, group size, and customization.</p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">5. User Responsibilities</h2>
          </div>
          <p className="text-gray-700 mb-4">By booking a service, you agree to:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md border-l-4 border-purple-500">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate personal and travel information.</li>
                <li>Respect local customs, laws, and the environment.</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-md border-l-4 border-purple-500">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Behave responsibly with fellow travelers and service staff.</li>
                <li>Follow safety instructions during adventure or water sports activities.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="bg-orange-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">6. Changes or Cancellations by Us</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Goa Tour Wala reserves the right to cancel or modify bookings in the event of:
          </p>
          <div className="space-y-3 mb-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">Unforeseen circumstances like natural disasters, strikes, or political unrest.</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">Minimum participation not being met for group tours.</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">Unavailability of services from third-party providers.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-md border-l-4 border-orange-500">
            <p className="text-gray-700 font-medium">
              In such cases, we may offer alternative options or a full refund where applicable.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-gray-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">7. Limitation of Liability</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">
              We act as an intermediary between you and third-party service providers (hotels, cab drivers, adventure companies, etc.).
            </p>
            <div className="bg-red-100 p-4 rounded-md border-l-4 border-red-500">
              <p className="text-gray-700 font-medium">
                We are not liable for injuries, delays, losses, damages, or cancellations caused by third parties or acts beyond our control.
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-md border-l-4 border-blue-500">
              <p className="text-blue-800 font-medium">
                Customers are advised to have valid travel insurance.
              </p>
            </div>
          </div>
        </section>

        {/* Sections 8-10 */}
        <div className="grid md:grid-cols-3 gap-6">
          <section className="bg-indigo-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Copyright className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">8. Intellectual Property</h2>
            </div>
            <p className="text-gray-700 text-sm">
              All content, branding, logos, images, and materials on our website and marketing materials are the property of Goa Tour Wala and may not be used or reproduced without permission.
            </p>
          </section>

          <section className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">9. Privacy</h2>
            </div>
            <p className="text-gray-700 text-sm">
              We value your privacy. Please refer to our Privacy Policy to understand how we collect and use your information.
            </p>
          </section>

          <section className="bg-purple-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Scale className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">10. Jurisdiction</h2>
            </div>
            <p className="text-gray-700 text-sm">
              These Terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts located in India.
            </p>
          </section>
        </div>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 mr-3" />
            <h2 className="text-2xl font-semibold">11. Contact Us</h2>
          </div>
          <p className="mb-4">If you have any questions or concerns regarding these Terms:</p>
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

export default TermsAndConditions;