const mongoose = require("mongoose");

const ProgrammerSchema = mongoose.Schema({
    firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  programmingLanguages: [String]
  ,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Programmer", ProgrammerSchema);
