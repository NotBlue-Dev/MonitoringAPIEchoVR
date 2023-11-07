const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  connectionInfo: {
    type: Object, // You can store JSON as an object
    required: true,
  },
});

const Server = mongoose.model('Server', serverSchema);

module.exports = Server;