const billRepository = require('../Adapter/out_mysql');
const KafkaProducer = require('../Adapter/kafka/out_kafka_producer');

async function updateBill(user) {
    try {
        const response = await billRepository.updateBillById(user.idUser, user);
        const kafkaProducer = new KafkaProducer();
        await kafkaProducer.sendMessage(JSON.stringify(user));
        return response;
    } catch (error) {
        throw new Error('Error en servicio');
    }
}

async function getBillService(billId) {
  try {
      const call = await billRepository.getBillByIdRepository(billId);
    return call;
  } catch (error) {
    throw new Error('Error al obtener la factura del usuario');
  }
}

module.exports = { getBillService, updateBill  };
