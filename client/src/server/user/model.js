const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const userSchema = mongoose.Schema({
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        maxlength: 100,
        default: ""
    },
    nickname: {
        type: String,
        maxlength: 100,
        default: ""
    },
    extension: {
        type: String,
        default: ""
    },
    nationality: {
        type: String,
        default: ""
    },
    countrycode: {
        type: String,
        default: ""
    },
    carrier: {
        type: String,
        default: ""
    },
    isAuth: {
        type: Boolean,
        default: false
    },
    isFirstTime: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: ""
    }
}, { timestamps: true });

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET)

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, process.env.SECRET, function (err, decode) {
        user.findOne({ "_id": decode, "token": token }), (err, user) => {
            if (err) return cb(err);
            cb(null, user);
        }
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }