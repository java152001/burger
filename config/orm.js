var connection = require('../config/connection.js');

var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM ?";
        connection.query(queryString, [tableInput], function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(tableInput, colToAddTo, valToAdd, cb) {
        var queryString = "INSERT INTO ? (?,?) VALUES (?,?)";
        connection.query(queryString, [tableInput, colToAddTo, valToAdd], function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    updateOne: function(tableInput, valuesToSet, conditionToSet, cb) {
        var queryString = "UPDATE ? SET ? WHERE ?";
        connection.query(queryString, [tableInput, valuesToSet, conditionToSet], function(err, result) {
            if (err) {
                throw err;
            }
        cb(result);
        });
    }
}

module.exports = orm;