const mongoose = require('mongoose');
const uuid = require('uuid');

const serverSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  key: {
     type: String,
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