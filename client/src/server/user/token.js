const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = mongoose.Schema({
    uid:{
        type: Schema.Types.ObjectId,
        required: true
    },
    token:{
        type: String,
        required: true
    },
    requestid:{
        type: String,
        default: ""
    }
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);

module.exports = { Token };