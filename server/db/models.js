var db = require('./config');

db.initialize();

// The `insert` function is passed an object that contains the properties
// needed to leave a mark: locations `x`, `y`, and `z`, as well as a `message`
exports.insert = function(userData, callback) {

  // Validate that correctly formatted userData that has been passed to `insert`
  if (validateInput(userData)) {

    // Use the provided userData to create custom objects to populate our
    // two separate tables, `marks` and `messages`.
    var message = createMessage(userData);
    var mark = createMark(userData);

    // Create an INSERT query to add the `mark` to the database
    db.connection.query('INSERT INTO messages SET ?', message, function(err, msg) {
      if (err) callback(err);
      callback(null, 'Successfully inserted new message to database.');

      // msg.insertId
    });
  } else {
    callback('Could not insert new message: invalid input.')
  }
};

// validateInput is passed some userData and will return true if that
// object has valid `x`, `y`, `z`, and `message` properties
var validateInput = function(userData) {
  if (!userData.x || !userData.y || !userData.z || !userData.message) {
    return false;
  }
  return true;
}

var createMark = function(userData) {
  var mark = {
    x: userData.x,
    y: userData.y,
    z: userData.z
  }
  return mark;
};

var createMessage = function(userData) {
  var message = {
    message_string: userData.message
  }
  return message;
};
