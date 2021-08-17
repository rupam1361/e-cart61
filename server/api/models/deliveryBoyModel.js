const mongoose = require("mongoose");

const deliveryBoySchema = mongoose.Schema({
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
  mobileNumber: {
    type: Number,
  },
  userProfileImage: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  role: {
    type: String,
  },
  isEngagedStatus: {
    type: Boolean,
  },
  createdAt: {
    type: String,
  },
  notifications: [
    {
      _id: { type: String },
      message: { type: String },
      deliveryDetailsCreatedAt: { type: String },
      orderDeliveryNotificationSeen: {
        type: Boolean,
      },
    },
  ],
});

module.exports = mongoose.model("deliveryBoy", deliveryBoySchema);
