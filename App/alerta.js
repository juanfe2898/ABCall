const { EmailClient } = require("@azure/communication-email");
const { Kafka } = require('kafkajs');
 
const connectionString = "endpoint=https://abcallmessage.unitedstates.communication.azure.com/;accesskey=BJqYSH8YXOBofNeXuPRc8p4b60nApOxDqV3MwyKbyDSmUB8kSVmmJQQJ99AJACULyCpr9LF1AAAAAZCSlH24";
const client = new EmailClient(connectionString);

// Configure the Kafka client
const kafka = new Kafka({
  clientId: 'AlertConsumer',
  brokers: ['localhost:9092'] // Replace with your Kafka broker addresses
});

// Create a consumer instance and subscribe to a topic
const consumer = kafka.consumer({ groupId: 'alerts-microservice' });

/**
 * Asynchronous function to connect the consumer, subscribe to specific topics, and process each message received.
 * For each message, determines if an alert needs to be sent based on the topic and sends the alert if necessary.
 */
const run = async () => {
  // Connect the consumer
  await consumer.connect();
  
  // Subscribe to the topics
  await consumer.subscribe({ topic: 'audio-analisado', fromBeginning: true });
  await consumer.subscribe({ topic: 'texto-analisado', fromBeginning: true });
  await consumer.subscribe({ topic: 'pago-con-fraude', fromBeginning: true }); 

  // Run the consumer and process each message
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        // log the action
        console.log({
            topic,
            partition,
            offset: message.offset,
            key: message.key ? message.key.toString() : null,
            value: message.value.toString(),
        });
        let needToSendAlert = false;
        let HTMlMesagge = ''
        switch (topic) {
            case 'audio-analisado':
                needToSendAlert = true;
                HTMlMesagge = `<html><body><h1>El audio de un incidente fue analizado correctamente.</h1></body></html>`
                break;
            case 'texto-analisado':
                needToSendAlert = true;
                HTMlMesagge = `<html><body><h1>El texto de un incidente fue analizado correctamente.</h1></body></html>`
                break;
            case 'pago-con-fraude':
                needToSendAlert = true;
                HTMlMesagge = `<html><body><h1>Se encontró fraude en una factura.</h1></body></html>`
                break;
            default:
                needToSendAlert = false;
                break;
        }
        if (needToSendAlert){
            await sendAlert(HTMlMesagge)
            console.log("An alert was sent with the topic " + topic + ". HTMlMesagge: " + HTMlMesagge)
        }else{
            console.log("The topic " + topic + " was caught, but there aren't any action to perform.")

        }
    },
  });
}

/**
 * Sends an alert email with the provided HTML content.
 * 
 * @param {string} html - The HTML content of the email.
 * @returns {Promise<void>} - A Promise that resolves once the email is sent successfully.
 */
async function sendAlert(html) {
    const emailMessage = {
        senderAddress: "DoNotReply@24ee64cf-5c96-45cd-9d96-4141f7f7123f.azurecomm.net",
        content: {
            subject: removeHtmlTags(html),
            plainText: removeHtmlTags(html),
            html: html,
        },
        recipients: {
            to: [{ address: "sawy0007@gmail.com" }],
        },
    };
 
    const poller = await client.beginSend(emailMessage);
    const result = await poller.pollUntilDone();
}
/**
 * Remove HTML tags from a string.
 * 
 * @param {string} value - The input string containing HTML tags.
 * @return {string} - The cleaned string without HTML tags.
 */
function removeHtmlTags(value) {
    if (typeof value !== 'string') {
        return '';
    }
    return value.replace(/<[^>]*>/g, '');
}

// Execute the function and handle any errors
run().catch(console.error);
