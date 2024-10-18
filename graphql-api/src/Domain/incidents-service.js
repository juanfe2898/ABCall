const incidentRepository = require('../Adapter/out_mysql');
const KafkaProducer = require('../Adapter/kafka/out_kafka_producer');


async function getIncidents() {
  try {
    const incidents = await incidentRepository.getAllIncidentsWithUsers();
    return incidents;
  } catch (error) {
    throw new Error('Error al obtener los incidentes.');
  }
}

async function createIncident(incidente) {
  try {
    const incidents = await incidentRepository.createIncident(incidente);
    const kafkaProducer = new KafkaProducer();
    await kafkaProducer.sendMessage(JSON.stringify(incidents));
    return incidents;
  } catch (error) {
    throw new Error('Error al guardar incidente');
  }
}

module.exports = {getIncidents, createIncident};
