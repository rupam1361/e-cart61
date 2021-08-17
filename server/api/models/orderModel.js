const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  phoneCode: {
    type: Number,
  },
  mobileNumber: {
    type: Number,
  },
  paymentMethod: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  paymentAcquirerData: {
    type: Object,
  },
  upiPaymentId: {
    type: String,
  },
  paymentBank: {
    type: String,
  },
  items: [],
  cartTotalPrice: {
    type: Number,
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  isSeenByAdmin: {
    type: Boolean,
  },
  isAcceptedByAdmin: {
    type: Boolean,
  },
  deliveryDate: {
    type: String,
  },
  orderDeliveryNotificationSeen: {
    type: Boolean,
  },
});

module.exports = mongoose.model("order", orderSchema);
