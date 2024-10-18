const KAFKA_CONFIG = {
    brokers: ['https://abcallmessage.unitedstates.communication.azure.com/;accesskey=BJqYSH8YXOBofNeXuPRc8p4b60nApOxDqV3MwyKbyDSmUB8kSVmmJQQJ99AJACULyCpr9LF1AAAAAZCSlH24'], // Cambia esto a tu configuración de broker
    topics: {
      updatedUser: 'usuario-actualizado',
    },
    clientId: 'ProducesAbCall'
  };
  
  module.exports = KAFKA_CONFIG;