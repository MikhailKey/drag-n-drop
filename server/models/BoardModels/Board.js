
const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
      },
    }
  ],
  columns: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Column',
        required: true,
      },
    }
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  columnOrder: [String]
})

module.exports = model('Board', schema);