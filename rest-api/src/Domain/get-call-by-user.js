const callRepository = require('../Adapter/out_mysql');

async function countCallByUser(userId) {
  try {
    const callCount = await callRepository.getCountByUserId(userId);
    return callCount;
  } catch (error) {
    throw new Error('Error al contar las llamadas para el usuario');
  }
}

module.exports = countCallByUser;