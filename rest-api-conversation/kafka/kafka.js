const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');
class KafkaProducer {
  //constructor(clientId = 'ABCalAnalisisFraudeConsumerProducer', brokers = ['vmkafkaabcall.eastus.cloudapp.azure.com:9092']) {
    constructor(clientId = 'ABCalAnalisisFraudeConsumerProducer', brokers = ['vmkafkaabcall.eastus2.cloudapp.azure.com:9092']) {
    this.kafka = new Kafka({
      clientId,
      brokers,
    });
    this.producer = this.kafka.producer();
  }

  async connect() {
    console.log("Conectando al productor de Kafka...");
    await this.producer.connect();
  }

  async sendMessage(hash, metadata) {
    try {
      await this.connect();
      console.log("value", value);
      const result = await this.producer.send({
        topic: 'usuario-actualizado',
        messages: [{ key: hash, value: metadata}],
      });
      console.log('Mensaje enviado:', result);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      throw error;
    } finally {
      await this.disconnect();
    }
  }

  async disconnect() {
    console.log("Desconectando productor...");
    await this.producer.disconnect();
  }
}

module.exports = KafkaProducer;
