const mongoose = require("mongoose");



const PaymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber:{type:String,required:true},
  orderId: { type: String, required: true, unique: true },
  state: { type: String },
  amount: { type: Number },
  tripDate:{type:String,required:true},
  tripDetails: {
    name: String, // name
    mobileNumber: String, // mobile
    tripPackage: String, // merchantOrderId
    travelDate: String, // travel date
    adults: String, // adults
    chilren: String, // children
  },
  paymentDetails: {type:Object,default:{},required:true},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
