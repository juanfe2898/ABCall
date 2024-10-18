const express = require('express');
const cors = require('cors');
const router = express.Router();
const { getBillService }= require('../Domain/get-call-by-user');


router.use(cors());

router.get('/bill/user/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'ID de usuario inválido' });
  }

  try {
    const call= await getBillService(userId);
    res.status(200).json({ ...call });
  } catch (error) {
    console.error('Error al obtener la factura del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


module.exports = router;