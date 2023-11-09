const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  apiservice_host: {
      type: String,
      required: true,
  },
  configservice_host: {
      type: String,
      required: true,
  },
  loginservice_host: {
      type: String,
      required: true,
  },
  matchingservice_host: {
      type: String,
      required: true,
  },
  serverdb_host: {
      type: String,
      required: true,
  },
  transactionservice_host: {
      type: String,
      required: true,
  },
  publisher_lock: {
      type: String,
  },
});

const Server = mongoose.model('Server', serverSchema);

module.exports = Server;