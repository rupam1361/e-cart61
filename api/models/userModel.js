const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  userProfileImage: {
    type: String,
  },
  role: {
    type: String,
  },
  passwordResetLink: {
    type: String,
  },
  cart: [],
  createdAt: {
    type: String,
  },
  notifications: [
    {
      _id: { type: String },
      message: { type: String },
      orderCreatedAt: { type: String },
      isSeenByAdmin: { type: Boolean },
      deliveryDetailsCreatedAt: { type: String },
      orderDeliveryNotificationSeen: {
        type: Boolean,
      },
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
