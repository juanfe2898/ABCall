const { Kafka } = require('kafkajs');

const { v4: uuidv4 } = require('uuid');

// Configure the Kafka client
const kafka = new Kafka({
  clientId: 'ABCalAnalisisTextoConsumerProducer',
  brokers: ['localhost:9092'] // Replace with your Kafka broker addresses
});

// Create a consumer instance and subscribe to a topic
const consumer = kafka.consumer({ groupId: 'analisis-texto-microservice' });

// Create a producer instance
const producer = kafka.producer()

/**
 * Asynchronous function to connect the consumer, subscribe to specific topics, and process each message received.
 * For each message, determines if an alert needs to be sent based on the topic and sends the alert if necessary.
 */
const run = async () => {
  // Connect the consumer
  await consumer.connect();
  
  // Subscribe to the topics
  await consumer.subscribe({ topic: 'incidente-creado', fromBeginning: true });

  // Run the consumer and process each message
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log("reciving incidente-creado topic");
        await produceMessage('hola')
    },
  });
}

async function  produceMessage(message){
    await producer.connect();
    // Send a message to the topic 'test-topic'
    await producer.send({
        topic: 'texto-analisado',
        messages: [
        { key: uuidv4(), value: 'Audio analizado' },
        ],
    });
    console.log('sent to texto-analizado topic')
    // Disconnect the producer once the message is sent
  await producer.disconnect();
}

 

// Execute the function and handle any errors
run().catch(console.error);
