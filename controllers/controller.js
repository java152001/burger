var express = require('express');
var path = require('path');

var router = express.Router();

var burger = require('../models/burger.js');

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var handlebarsObject = {
            burgers: data
        };
        console.log(handlebarsObject);
        res.render('index', handlebarsObject);
    });
});

router.post('/api/burger', function(req, res) {
    burger.insertOne([
        'burger_name', 'devoured'
    ],
    [
        req.body.burger_name,
        false
    ],
    function(result) {
        res.json({ id: result.insertId});
    });
});

router.put('/api/burger/:id', function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: true
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    }
    );
});

module.exports = router;