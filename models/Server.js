const mongoose = require('mongoose');
const uuid = require('uuid');

const serverSchema = new mongoose.Schema({
  serverAddress: {
    type: String,
    required: true,
    unique: true,
  },
  key: {
     type: String,
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
  isOnline: {
      type: Boolean,
  }
});

serverSchema.pre('updateOne', async function (next) {
    const query = this.getQuery();
    const update = this.getUpdate();

    if (!update.$set) {
        update.$set = {};
    }

    const existingDoc = await this.model.findOne(query);

    if (existingDoc) {
        // Document exists, update the key if needed
        if (!update.$set.key && !existingDoc.key) {
            update.$set.key = uuid.v4();
        }
    } else {
        // Document doesn't exist, create it with a new key
        update.$set.key = uuid.v4();
    }

    next();
});
const Server = mongoose.model('Server', serverSchema);

module.exports = Server;