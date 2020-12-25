const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create buyer schema
const BuyerSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  loaction: {
    country: {
      type: String,
      required: true,
      trim: true
    },
    landmark: {
      type: String,
      required: true,
      trim: true
    }
  },
  telephone: {
    type: String,
    required: true,
    trim: true
  }
})

//create seller schema
const SellerSchema = new Schema({
  shopName: {
    type: String,
    required: true,
    trim: true
  },
  businessLogo: {
    type: String,
    trim: true
  }
})

mongoose.model('buyer', BuyerSchema)
mongoose.model('seller', SellerSchema)
