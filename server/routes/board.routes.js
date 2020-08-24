const { Router } = require('express');
const User = require('../models/User');
const Board = require('../models/BoardModels/Board');
const router = Router();

function mapBoards(boards) {
  if (!boards.length) {
    return []
  }
  return boards.map(c => ({
    ...c.board_id._doc,
    id: c.board_id.id
  }))
}

router.get('/:id', async (req, res) => {
  let id = req.params.id;
  const user = await req.user.populate('boards.board_id').execPopulate();
  const boards = mapBoards(user.boards);

  let targetBoard = boards.find(item => item.id === id);
  return res.status(200).json(targetBoard);
})

router.get('/', async (req, res) => {
  try {
    const user = await req.user.populate('boards.board_id').execPopulate();
    const boards = mapBoards(user.boards);
    return res.status(200).json(boards);
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

router.post('/create', async (req, res) => {
  const { title } = req.body;
  const user = req.session.user;

  const board = new Board({
    name: title,
    userId: user
  })

  try {
    await board.save();
    await req.user.addBoard(board);
    return res.status(200).json(board);
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

module.exports = router;