const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');


class KafkaProducer {
  constructor(clientId = 'ProducesAbCall', brokers = ['vmkafkaabcall.eastus.cloudapp.azure.com:9092']) {
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

  async sendMessage(key, value) {
    try {

      await this.producer.connect();
      // Send a message to the topic 'test-topic'
      await this.producer.send({
          topic: 'incidente-creado',
          messages: [
          { key: uuidv4(), value: 'inciente creado' },
          ],
      });
      console.log('sent to incidente-creado topic')
      // Disconnect the producer once the message is sent
      await this.producer.disconnect();

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
