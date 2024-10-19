const { Kafka } = require('kafkajs');

const { v4: uuidv4 } = require('uuid');
const userRepository = require('./out_mysql');
// Configure the Kafka client
const kafka = new Kafka({
  clientId: 'ABCalAnalisisFraudeConsumerProducer',
  brokers: ['192.168.10.11:9092'] // Replace with your Kafka broker addresses
});

// Create a consumer instance and subscribe to a topic
const consumer = kafka.consumer({ groupId: 'analisis-fraude-microservice' });


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
  await consumer.subscribe({ topic: 'usuario-actualizado', fromBeginning: true });
  await consumer.subscribe({ topic: 'factura-pagada', fromBeginning: true });

  // Run the consumer and process each message
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      console.log('got topic: '+ topic)
      console.log('message: '+ message)
      const messageValue = message.value.toString();
      const eventData = JSON.parse(messageValue);
      switch (topic) {
        case 'factura-pagada':
            console.log("reciving factura-pagada topic");
            randomNumber = Math.floor(Math.random() * 2) + 1;
            if (randomNumber === 1) {
              console.log('send fraude message')
              await produceMessage('pago-con-fraude', 'factura con fraude')
            }else{
              console.log('random number = ' + randomNumber)
            }
          break;
        
        case 'usuario-actualizado':
          console.log("Recibiendo mensaje de 'usuario-actualizado'");
          const messageValue = message?.value;
          console.log("message.value.toString()", message?.value)
          const eventData = JSON.parse(messageValue);
          try {
            const response = await userRepository.updateUserById(eventData.idUser, eventData);
            console.log('Usuario actualizado correctamente:', response);
          } catch (error) {
            console.error('Error al actualizar usuario:', error.message);
          }

          break;
      
        default:
          break;
      }
    },
  });
}

async function  produceMessage(topic, message){
    await producer.connect();
    // Send a message to the topic 'test-topic'
    await producer.send({
        topic: topic,
        messages: [
        { key: uuidv4(), value: message },
        ],
    });
    console.log('sent to ' + topic + ' topic')
    // Disconnect the producer once the message is sent
  await producer.disconnect();
}

 

// Execute the function and handle any errors
run().catch(console.error);
