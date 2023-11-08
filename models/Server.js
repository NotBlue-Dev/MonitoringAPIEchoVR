const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  connectionInfo: {
    type: Object, // You can store JSON as an object
    required: true,
  },
});

const Server = mongoose.model('Server', serverSchema);

module.exports = Server;