var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({

    pin: String,
    user: String,
    createdAt: Date,
    updatedAt: Date,
    card: {
        cardNumber: String,
        cardDate: String
    },
    fullName: String,
    status: String

});

module.exports = mongoose.model('Transaction', transactionSchema);
