const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
}, { timestamps: true });

module.exports = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
