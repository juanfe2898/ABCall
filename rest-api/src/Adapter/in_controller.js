const express = require('express');
const cors = require('cors');
const router = express.Router();
const {countCallByUser , getCallService}= require('../Domain/get-call-by-user');


router.use(cors());

router.get('/call/user/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'ID de usuario inválido' });
  }

  try {
    const call= await getCallService(userId);
    res.status(200).json({ userId, call });
  } catch (error) {
    console.error('Error al obtener el conteo de llamadas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


router.get('/call/countByUser/user/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'ID de usuario inválido' });
  }

  try {
    const call= await countCallByUser(userId);
    res.status(200).json({ userId, call });
  } catch (error) {
    console.error('Error al obtener el conteo de llamadas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;