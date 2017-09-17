var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({

    pin: String,
    user: String,
    createdAt: Date,
    updatedAt: Date,
    total: String,
    location: String,
    status: String,
    barClientId: String,
    patronClientId: String

});

module.exports = mongoose.model('Transaction', transactionSchema);
