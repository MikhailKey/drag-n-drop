const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();

//api/auth
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({ message: "Такой пользователь уже существует" })
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });

    await user.save()

    res.status(201).json({ message: 'Пользователь успешно зарегестрирован' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так...' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Данный пользователь не найден' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверные данные' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    req.session.user = user;

    return res.status(200).json({ token, userId: user.id })
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так...' })
  }
})

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    return res.status(200).json({ message: 'success' })
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка при выходе из сессии' })
  }
});


module.exports = router;