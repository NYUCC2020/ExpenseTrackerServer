const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  deviceName: {
    type: String,
    trim: true,
    required: [true, 'Please give your device a unique name']
  },
  power: {
    type: Number,
    required: [true, 'Please enter the power of your device in Watt']
  },
  status: {
    type: String,
    default: "ON"
  },
  statusUpdateTime: {
    type: Number,
    default: Date.now()/1000,
  },
  activeSeconds: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model('Device', DeviceSchema);