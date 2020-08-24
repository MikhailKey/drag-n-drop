const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  boards: [
    {
      board_id: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true
      }
    }
  ]
})

userSchema.methods.addBoard = function (board) {
  const items = this.boards;

  let newBoard = {
    board_id: board._id
  }

  items.push(newBoard); 

  this.boards = items;
  return this.save();
}

module.exports = model('User', userSchema);