const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  title: String,
  tasks: [String],

})

module.exports = model('Column', schema);