const mongoose = require('mongoose');

const pangolinSchema = mongoose.Schema({
  age: { type: Number, required: true },
  famille : { type: String, required: true},
  race : { type: String, required: true },
  nourriture: { type: String, required: true},
})

module.exports = mongoose.model('Pangolin', pangolinSchema);