const express = require('express');
const cors = require('cors');
const router = express.Router();
const { getBillService, createBill }= require('../Domain/billservice');




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

router.post('/bill/user/:userID/:billID/:amount', async (req, res) => {
  const userID = parseInt(req.params.userID, 10);
  const billID = parseInt(req.params.billID, 10);
  const amount = parseInt(req.params.amount, 10);

  console.log(userID,
    billID,
    amount);

  if (isNaN(userID) || isNaN(billID) || isNaN(amount)) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const call= await createBill(billID, {
      name: 'Andres',
      amount: amount,
    });

    res.status(200).json({ ...call });
  } catch (error) {
    console.error('Error al obtener la factura del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



module.exports = router;