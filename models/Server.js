const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  apiservice_host: {
      type: String,
  },
  configservice_host: {
      type: String,
  },
  loginservice_host: {
      type: String,
  },
  matchingservice_host: {
      type: String,
  },
  serverdb_host: {
      type: String,
  },
  transactionservice_host: {
      type: String,
  },
  publisher_lock: {
      type: String,
  },
  online: {
      type: Boolean,
  }
});

const Server = mongoose.model('Server', serverSchema);

module.exports = Server;