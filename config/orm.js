var connection = require('../config/connection.js');

function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableInput], function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(tableInput, colToAddTo, valToAdd, cb) {
        colToAddTo = colToAddTo.toString();
        var queryString = "INSERT INTO " + tableInput + " (" + colToAddTo + ") VALUES (?,?)";
        console.log(queryString);
        console.log(valToAdd);
        connection.query(queryString, valToAdd, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    updateOne: function(tableInput, valuesToSet, conditionToSet, cb) {
        var queryString = "UPDATE " + tableInput;

        queryString += " SET " + objToSql(valuesToSet);
        queryString += " WHERE " + conditionToSet;
        
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
        cb(result);
        });
    }
}

module.exports = orm;