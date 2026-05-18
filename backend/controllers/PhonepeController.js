require("dotenv").config();
const axios = require("axios");
const generateAccessToken = require("../utils/AccessTokenGenerator");
const { eventNames } = require("../models/Payment");

// Function to generate a shorter merchantOrderId
const generateMerchantOrderId = () => {
  const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0"); // 4 digit random number
  return `ORD${timestamp}${random}`; // Format: ORD + timestamp + random
};

// Function to complete payment
const complete_payment = async (
  accessToken,
  name,
  mobileNumber,
  amount,
  merchantOrderId,
  children,
  adults,
  date,
  subSlug,
  categorySlug,
) => {
  try {
    const paymentResponse = await axios.post(
      `${process.env.CREATE_PAYMENT_URL}${process.env.CREATE_PAYMENT_ENDPOINT}`,
      {
        merchantOrderId: merchantOrderId,
        amount: amount,
        expireAfter: 1200,
        metaInfo: {
          udf1: `name:${name}`,
          udf2: `mobileNumber:${mobileNumber}`,
          udf3: `merchantOrderId:${merchantOrderId}`,
          udf4: `TravelDate:${date}`,
          udf5: `Adults:${adults}|children:${children}`,
        },
        paymentFlow: {
          type: "PG_CHECKOUT",
          message: "Payment message used for collect requests",
          merchantUrls: {
            // redirectUrl: `${process.env.REACT_APP_FRONTEND_URL}/${categorySlug}/${subSlug}?merchantOrderId=${merchantOrderId}`,
            redirectUrl: `${process.env.REACT_APP_FRONTEND_URL}/Thankyou?merchantOrderId=${merchantOrderId}&packageType=${subSlug}`,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `O-Bearer ${accessToken}`,
        },
      },
    );

    const redirectUrl = paymentResponse.data.redirectUrl;

    return {
      status: paymentResponse.status,
      orderId: paymentResponse.orderId,
      redirectUrl: redirectUrl,
      merchantOrderId: merchantOrderId,
    };
  } catch (error) {
    console.error(
      "Error in complete_payment:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

exports.pay = async (req, res) => {
  try {
    const {
      name,
      amount,
      mobileNumber,
      adults,
      children,
      date,
      subSlug,
      categorySlug,
    } = req.body;

    const merchantOrderId = generateMerchantOrderId();

    // Get access token using the new function
    const tokenResult = await generateAccessToken();
    if (!tokenResult.success) {
      throw new Error(tokenResult.error);
    }
    const accessToken = tokenResult.accessToken;
    console.log(accessToken);

    // Call complete_payment function
    const paymentResponse = await complete_payment(
      accessToken,
      name,
      mobileNumber,
      amount,
      merchantOrderId,
      children,
      adults,
      date,
      subSlug,
      categorySlug,
    );

    res.status(200).json({
      success: true,
      redirectUrl: paymentResponse.redirectUrl,
      merchantOrderId: paymentResponse.merchantOrderId,
    });
  } catch (error) {
    console.error(
      "Error processing payment:",
      error.response?.data || error.message,
    );
    res.status(500).json({
      success: false,
      message: "Failed to process payment",
      error: error.response?.data || error.message,
    });
  }
};

exports.checkPaymentStatus = async (req, res) => {
  const { merchantOrderId } = req.body;
  console.log(merchantOrderId);

  const tokenResult = await generateAccessToken();
  if (!tokenResult.success) {
    throw new Error(tokenResult.error);
  }
  const accessToken = tokenResult.accessToken;

  const response = await axios.get(
    `${process.env.CHECK_PAYMENT_URL}${process.env.CHECK_PAYMENT_ENDPOINT_1}/${merchantOrderId}${process.env.CHECK_PAYMENT_ENDPOINT_2}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${accessToken}`,
      },
    },
  );

  const status = response.data; // like COMPLETED or FAILED
  res.json({ status });
};
