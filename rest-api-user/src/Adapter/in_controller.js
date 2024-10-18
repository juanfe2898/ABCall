const express = require('express');
const cors = require('cors');
const router = express.Router();
const { updateInfoUser }= require('../Domain/service');


router.use(cors());

router.post('/update/', async (req, res) => {

  const user = req.body; 
  try {
    await updateInfoUser(user);
    return res.status(200).json({ message: 'User update message sent to Kafka.' });
  } catch (error) {
    console.error('Error sending message to Kafka:', error);
    return res.status(500).json({ error: 'Failed to send message to Kafka.' });
  }
});

module.exports = router;