const userRepository = require('../Adapter/out_mysql');
const KafkaProducer = require('../Adapter/kafka/out_kafka_producer');

async function updateInfoUser(user) {
  try {
    const response = await userRepository.updateUserById(user.idUser, user);
    const kafkaProducer = new KafkaProducer();
    await kafkaProducer.sendMessage(JSON.stringify(user));
    return response;
  } catch (error) {
    throw new Error('Error en servicio');
  }
}

module.exports = {updateInfoUser};
