const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  items: [
    {
      productId: {
  type: String
},
      title: { type: String },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String }
    }
  ],
  subtotal: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  address: {
    fullName: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    addressLine: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  paymentMethod: { type: String, required: true }, 
  // e.g., 'UPI', 'CARD', 'COD'

  // Razorpay Payment Details

razorpayOrderId: {
  type: String,
},

razorpayPaymentId: {
  type: String,
  unique: true,
  sparse: true,
},

razorpaySignature: {
  type: String,
},
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  orderStatus: {
  type: String,
  enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
  default: 'placed'
},

tracking: {

  progress: {
    type: Number,
    default: 0
  },

  currentLocation: {
    type: String,
    default: "Beardo Warehouse, Ahmedabad"
  },

  eta: {
    type: String,
    default: "Tomorrow Before 8 PM"
  },

  courier: {
    type: String,
    default: "Blue Dart"
  },

  deliveryBoy: {

    name: {
      type: String,
      default: ""
    },

    phone: {
      type: String,
      default: ""
    },

    vehicle: {
      type: String,
      default: ""
    },

    otp: {
      type: String,
      default: ""
    }

  },

  history: [
    {
      status: String,
      location: String,
      time: Date
    }
  ]

}
}, {
  timestamps: true // Automatically handles createdAt and updatedAt
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
