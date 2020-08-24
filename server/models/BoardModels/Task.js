const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  ObjectId: {
    content: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
})

module.exports = model('Task', schema);