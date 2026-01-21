const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    shippingAddress: {
      line1: { type: String, required: true },
      line2: { type: String },
      city: { type: String, required: true },
      state: { type: String },
      country: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    paymentId: { type: String }, // optional: Stripe/PayPal payment ID
    purchasedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
