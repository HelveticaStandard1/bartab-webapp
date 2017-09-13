var Transaction = require('../models/transaction');
var path = require('path');

module.exports = function (app) {

    app.post('/api/transaction', function (req, res, next) {

        var transaction = new Transaction();

        transaction.pin = req.body.pin;
        transaction.user = req.body.user;
        transaction.createdAt = Date.now();
        transaction.updatedAt = Date.now();
        transaction.card = req.body.card;
        transaction.fullName = req.body.fullName;
        transaction.status = 'New';

        transaction.save(function (error) {
                console.log('Request was saved successfully');
                res.status(200).send('success');
                if (error) {
                    console.log(error);
                    res.status(500).send('An error occured: ' + error);
                }
            }
        );
    });

    app.get('/api/transaction/:uid', function (req, res) {
        var user = req.params.uid;
        Transaction.find({user: user}).exec()
            .then(function (result) {
                res.send(result);
            });
    });

    app.get('/api/transaction', function (req, res) {
        var user = req.query.user;
        var pin = req.query.pin;
        Transaction.findOne({user: user, pin: pin}).exec()
            .then(function (result) {
                res.send(result);
            });
    });

    app.put('/api/transaction', function (req, res) {
        var pin = req.body.pin;
        var location = req.body.location;
        var status = req.body.status;

        Transaction.findOneAndUpdate({pin: pin}, {location: location, status: status}, {new: true}).exec()
            .then(function (result) {
                res.send(result);
            }, function (error) {
                console.log(error);
            });
    });

    app.get('*', function (req, res) {
        res.render(path.join('../views/index'));
    });

};