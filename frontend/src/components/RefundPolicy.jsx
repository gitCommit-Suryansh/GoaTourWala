import React from 'react';
import { RefreshCw, Mail, CheckCircle, XCircle, AlertTriangle, Clock, CreditCard, Edit, Phone } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const RefundPolicy = () => {
  return (
    <div className="mx-auto pt-5">
      <Header/>
      <div className="text-center mb-8 border-b pb-6 mt-14">
        <div className="flex items-center justify-center mb-4">
          <RefreshCw className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Refund & Cancellation Policy</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Thank you for choosing Goa Tour Wala for your travel and tour needs. We aim to offer smooth, safe, and memorable experiences. Please review our refund and cancellation policy carefully before making any booking.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8 p-4">
        {/* Section 1 */}
        <section className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">1. Booking Confirmation</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">All bookings must be confirmed via email, WhatsApp, or through our official website.</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">A minimum advance payment is required to confirm your booking.</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">Full payment must be made before the tour starts unless otherwise agreed in writing.</p>
            </div>
          </div>
        </section>

        {/* Section 2 - Customer Cancellation */}
        <section className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <XCircle className="w-6 h-6 text-red-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">2. Cancellation by Customer</h2>
          </div>
          <p className="text-gray-700 mb-6">
            If you wish to cancel your booking, please notify us in writing at{' '}
            <a href="mailto:info@goatourwala.com" className="text-blue-600 hover:underline font-medium">
              info@goatourwala.com
            </a>. The following refund policy will apply:
          </p>
          
          {/* Refund Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 border-b">
                    Cancellation Period Before Travel Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 border-b">
                    Refund Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-700 border-b">More than 15 days</td>
                  <td className="px-6 py-4 border-b">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      80% refund
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-700 border-b">8–14 days</td>
                  <td className="px-6 py-4 border-b">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      50% refund
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-700 border-b">Less than 7 days</td>
                  <td className="px-6 py-4 border-b">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      No refund
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-700">No Show on Travel Day</td>
                  <td className="px-6 py-4">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      No refund
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-100 p-4 rounded-md border-l-4 border-yellow-500">
            <p className="text-yellow-800 font-medium">
              <strong>Note:</strong> The refund will be processed only after deducting applicable transaction fees, booking charges, and third-party supplier costs.
            </p>
          </div>
        </section>

        {/* Section 3 - Company Cancellation */}
        <section className="bg-orange-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">3. Cancellation by Company</h2>
          </div>
          <p className="text-gray-700 mb-4">
            In rare cases, Goa Tour Wala may cancel a booking due to:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-md border-l-4 border-orange-500">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Natural calamities (floods, storms, etc.)</li>
                <li>Political unrest or safety concerns</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-md border-l-4 border-orange-500">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Minimum group size not being met</li>
                <li>Technical or operational reasons</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-orange-200 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">In such cases, we will offer:</h3>
            <div className="flex flex-wrap gap-3">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                A full refund of the amount paid
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                A rescheduling option
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                A credit voucher for future use
              </span>
            </div>
          </div>

          <div className="bg-red-100 p-4 rounded-md border-l-4 border-red-500">
            <p className="text-red-800 font-medium">
              We will not be liable for any additional costs incurred by the customer, such as flight tickets, visas, or hotel bookings made independently.
            </p>
          </div>
        </section>

        {/* Section 4 - Refund Process */}
        <section className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">4. Refund Process</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-700">
                Refunds (if applicable) will be processed and credited within <strong>7–10 business days</strong> after cancellation approval.
              </p>
            </div>
            <div className="flex items-start">
              <CreditCard className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-700">
                Refunds will be made to the original payment method only.
              </p>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-700">
                We are not responsible for delays caused by banks, payment gateways, or third-party services.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 - Non-Refundable Services */}
        <section className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <XCircle className="w-6 h-6 text-gray-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">5. Non-Refundable Services</h2>
          </div>
          <p className="text-gray-700 mb-4">The following services are non-refundable:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md border-l-4 border-red-500">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Booking/Convenience/Processing fees</li>
                <li>Hotel/accommodation charges once confirmed</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-md border-l-4 border-red-500">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Activity bookings with no-refund terms from local vendors</li>
                <li>Personalized/custom packages after confirmation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6 - Modifications */}
        <section className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Edit className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">6. Modifications & Rescheduling</h2>
          </div>
          <p className="text-gray-700 mb-4">We allow modifications to bookings based on availability:</p>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-md border-l-4 border-purple-500">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-700">Date changes are allowed up to 7 days before the travel date.</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md border-l-4 border-purple-500">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-700">Any increase in cost due to revised travel dates will be borne by the customer.</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md border-l-4 border-purple-500">
              <div className="flex items-start">
                <XCircle className="w-5 h-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-700">Rescheduling is not guaranteed during peak seasons or public holidays.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 mr-3" />
            <h2 className="text-2xl font-semibold">7. Contact Us</h2>
          </div>
          <p className="mb-4">For cancellations, refunds, or modifications, please contact:</p>
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

export default RefundPolicy;