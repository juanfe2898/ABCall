const billRepository = require('../Adapter/out_mysql');
const { v4: uuidv4 } = require('uuid');
const { Kafka } = require('kafkajs');

// Configure the Kafka client
const kafka = new Kafka({
  clientId: 'ABCalAnalisisAudioConsumerProducer',
  brokers: ['vmkafkaabcall.eastus.cloudapp.azure.com:9092'] // Replace with your Kafka broker addresses
});

// Create a producer instance
const producer = kafka.producer()

async function createBill(billId, billData) {
    try {
        const response = await billRepository.createBill(billId, billData);
        console.log('billservice', response)
        if( response ){
          produceMessage(billData)
        } 
        
        return response;
    } catch (error) {
        throw new Error('Error en servicio');
    }
}

async function getBillService(billId) {
  try {
      const call = await billRepository.getBillByIdRepository(billId);
    return call;
  } catch (error) {
    throw new Error('Error al obtener la factura del usuario');
  }
}

async function  produceMessage(billData){
  await producer.connect();
  // Send a message to the topic 'test-topic'
  await producer.send({
      topic: 'factura-pagada',
      messages: [
      { key: uuidv4(), value: 'factura_pagada' },
      ],
  });
  console.log('sent to audio-analizado topic')
  // Disconnect the producer once the message is sent
await producer.disconnect();
}

module.exports = { getBillService, createBill  };
