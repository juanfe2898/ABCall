const { Kafka } = require('kafkajs');
 
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'] // Replace with your Kafka broker addresses
});
 
 
const producer = kafka.producer();
 
const sendMessage = async (topic, message) => {
  await producer.send({
    topic,
    messages: [{ value: message }]
  });
};
 
const consumer = kafka.consumer({ groupId: 'my-group' });
 
const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-cluster', fromBeginning: true });
 
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        key: message.key.toString(),
        value: message.value.toString()
      });
    }
  });
};
 
const run = async () => {
  await producer.connect();
  await startConsumer();
};
 
run().catch(console.error);