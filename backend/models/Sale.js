const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    soldAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sale', saleSchema);
