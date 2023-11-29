const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  apiServiceHost: {
      type: String,
  },
  configServiceHost: {
      type: String,
  },
  loginServiceHost: {
      type: String,
  },
  matchingServiceHost: {
      type: String,
  },
  serverDbHost: {
      type: String,
  },
  transactionServiceHost: {
      type: String,
  },
  publisherLock: {
      type: String,
  },
  online: {
      type: Boolean,
  }
});

const Server = mongoose.model('Server', serverSchema);

module.exports = Server;