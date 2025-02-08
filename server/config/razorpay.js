const Razorpay = require("razorpay");

require("dotenv").config();
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY); // Debugging
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_SECRET); // Debugging

exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
	key_secret: process.env.RAZORPAY_SECRET,
});