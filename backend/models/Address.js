const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  line: { type: String, required: true }, // Address line 1
  landmark: { type: String }
}, {
  timestamps: true
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
