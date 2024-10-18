const { Kafka } = require('kafkajs');
 
// Configure the Kafka instance
const kafka = new Kafka({
  clientId: 'ProducesAbCall',
  brokers: ['localhost:9092'] // Replace with your Kafka broker addresses
});
 
// Create a producer instance
const producer = kafka.producer()
 
// Function to send a message
const run = async () => {
  // Connect the producer
  await producer.connect();
 
  // Send a message to the topic 'test-topic'
  await producer.send({
    topic: 'factura-pagada',
    messages: [
      { key: 'key1', value: 'Que si carajo' },
    ],
  });
 
  // Disconnect the producer once the message is sent
  await producer.disconnect();
}
 
// Run the function and handle any errors
run().catch(console.error);