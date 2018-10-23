var orm = require('../config/orm.js');

var burger = {
    selectAll: function(cb) {
        orm.all("burgers", function(res) {
            cb(res);
        });
    },
    insertOne: function(colToAddTo, valToAdd, cb) {
        orm.insertOne('burgers', colToAddTo, valToAdd, function(res) {
            cb(res);
        });
    },
    updateOne: function(valuesToSet, conditionToSet, cb) {
        orm.updateOne('burgers', valuesToSet, conditionToSet, function(res) {
            cb(res);
        });
    }
}

module.exports = burger;