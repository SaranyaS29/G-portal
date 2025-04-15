const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  regNo: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  issueType: String,
  mobile: String,
  name: String,
  email: String,
  communicationAddress: String,
  locality: String,
  ward: String,
  zone: String,
  doorNo: String,
  fullAddress: String,
  attachments: [{ type: String }],
  
});

module.exports = mongoose.model('Complaint', complaintSchema);
