const KAFKA_CONFIG = {
    brokers: ['vmkafkaabcall.eastus.cloudapp.azure.com:9092'], // Cambia esto a tu configuración de broker
    topics: {
        newBill: 'factura-pagada',
    },
    clientId: 'ProducesAbCall'
  };
  
  module.exports = KAFKA_CONFIG;