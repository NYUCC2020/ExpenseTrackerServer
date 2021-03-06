const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    walletAddress: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', UserSchema);