const { Kafka } = require('kafkajs');

class KafkaProducer {
  constructor(clientId = 'ProducesAbCall', brokers = ['localhost:9092']) {
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

  async sendMessage(topic, key, value) {
    try {
      await this.connect();

      const result = await this.producer.send({
        topic,
        messages: [{ key, value }],
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
