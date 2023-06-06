const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    isUsersAdmin: {
        type: Boolean,
        default: false,
    },
    isProductsAdmin: {
        type: Boolean,
        default: false,
    },
    isOrdersAdmin: {
        type: Boolean,
        default: false,
    },

});

adminSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

adminSchema.set('toJSON', {
    virtuals: true,
});

exports.Admin = mongoose.model('Admin', adminSchema);
exports.adminSchema = adminSchema;