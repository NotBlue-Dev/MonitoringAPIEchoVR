const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
  }
});

const Server = mongoose.model('Server', serverSchema);

module.exports = Server;