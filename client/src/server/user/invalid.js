const mongoose = require('mongoose');

const invalidSchema = mongoose.Schema({
    phone: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Invalid = mongoose.model('Invalid', invalidSchema);

module.exports = { Invalid };