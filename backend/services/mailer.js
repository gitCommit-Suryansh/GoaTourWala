// backend/services/mailer.js
const nodemailer = require("nodemailer");

async function sendBookingNotification(bookingData) {
  try {
    // transporter setup with your domain's SMTP
    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com", 
      port: 465,                     // usually 465 for SSL or 587 for TLS
      secure: true,                  // true for port 465, false for 587
      auth: {
        user: process.env.MAIL_ID,  // your email
        pass: process.env.MAIL_PASS,         // your email password (or app password)
      },
    });

    // mail options
    let info = await transporter.sendMail({
        from: '"GoaTourWala" <info@goatourwala.com>',
        to: "info@goatourwala.com",
        subject: `🎉 New Booking Received - ${bookingData.name}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>New Booking Notification</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header -->
                  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                          🏖️ GoaTourWala
                      </h1>
                      <p style="color: #e8f0fe; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                          New Booking Alert
                      </p>
                  </div>
      
                  <!-- Success Banner -->
                  <div style="background-color: #10b981; color: white; text-align: center; padding: 15px;">
                      <h2 style="margin: 0; font-size: 20px;">
                          ✅ Booking Successfully Received!
                      </h2>
                  </div>
      
                  <!-- Content -->
                  <div style="padding: 30px 20px;">
                      
                      <!-- Customer Details Card -->
                      <div style="background-color: #f8fafc; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                          <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px; display: flex; align-items: center;">
                              👤 Customer Information
                          </h3>
                          <table style="width: 100%; border-collapse: collapse;">
                              <tr>
                                  <td style="padding: 8px 0; font-weight: 600; color: #6b7280; width: 30%;">Name:</td>
                                  <td style="padding: 8px 0; color: #111827; font-weight: 500;">${bookingData.name}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Phone:</td>
                                  <td style="padding: 8px 0; color: #111827; font-weight: 500;">
                                      <a href="tel:${bookingData.phone}" style="color: #059669; text-decoration: none;">
                                          📞 ${bookingData.phone}
                                      </a>
                                  </td>
                              </tr>
                          </table>
                      </div>
      
                      <!-- Booking Details Card -->
                      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                          <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px; display: flex; align-items: center;">
                              🏖️ Booking Details
                          </h3>
                          <table style="width: 100%; border-collapse: collapse;">
                              <tr>
                                  <td style="padding: 8px 0; font-weight: 600; color: #6b7280; width: 30%;">Package:</td>
                                  <td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 16px;">${bookingData.package}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Adults:</td>
                                  <td style="padding: 8px 0; color: #111827; font-weight: 500;">👥 ${bookingData.Adults}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Children:</td>
                                  <td style="padding: 8px 0; color: #111827; font-weight: 500;">👶 ${bookingData.Children}</td>
                              </tr>
                          </table>
                      </div>
      
                      <!-- Payment Details -->
                      <div style="background-color: #dcfce7; border-left: 4px solid #10b981; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                          <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px; display: flex; align-items: center;">
                              💰 Payment Information
                          </h3>
                          <div style="text-align: center; background-color: #10b981; color: white; padding: 15px; border-radius: 8px; margin-top: 10px;">
                              <span style="font-size: 14px; opacity: 0.9;">Amount Paid</span><br>
                              <span style="font-size: 24px; font-weight: bold;">₹${bookingData.amount}</span>
                          </div>
                      </div>
      
                      <!-- Action Button -->
                      <div style="text-align: center; margin: 30px 0;">
                          <a href="https://admin.goatourwala.com" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                              🏗️ View in Admin Panel
                          </a>
                      </div>
      
                      <!-- Footer Note -->
                      <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #e2e8f0;">
                          <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                              <strong>Next Steps:</strong><br>
                              • Contact the customer within 24 hours<br>
                              • Confirm booking details and itinerary<br>
                              • Send welcome package and travel guidelines
                          </p>
                      </div>
                  </div>
      
                  <!-- Footer -->
                  <div style="background-color: #374151; color: #d1d5db; text-align: center; padding: 20px; font-size: 12px;">
                      <p style="margin: 0;">
                          © 2024 GoaTourWala | Making Goa memories since inception<br>
                          <span style="color: #9ca3af;">This is an automated notification from your booking system</span>
                      </p>
                  </div>
              </div>
          </body>
          </html>
        `,
      });

    console.log("Booking email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending booking email:", error);
  }
}

module.exports = sendBookingNotification;
