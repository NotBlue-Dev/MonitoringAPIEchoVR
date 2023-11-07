const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  connectionInfo: {
    type: Object, // You can store JSON as an object
    required: true,
  },
});

serverSchema.methods.toJson = function(){
  return {
    name: this.name,
    connectionInfo: this.connectionInfo,
  };
};


const Server = mongoose.model('Server', serverSchema);

module.exports = Server;