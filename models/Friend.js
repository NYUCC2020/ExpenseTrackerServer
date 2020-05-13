const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  friendname: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Friend', FriendSchema);