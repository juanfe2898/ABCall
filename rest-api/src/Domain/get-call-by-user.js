const callRepository = require('../Adapter/out_mysql');

async function countCallByUser(userId) {
  try {
    const call = await callRepository.getCountByUserId(userId);
    return call;
  } catch (error) {
    throw new Error('Error al contar las llamadas para el usuario');
  }
}


async function getCallService(userId) {
  try {
    const call = await callRepository.getCallByIdRepository(userId);
    return call;
  } catch (error) {
    throw new Error('Error al contar las llamadas para el usuario');
  }
}

module.exports = {countCallByUser, getCallService};
