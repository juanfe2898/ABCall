require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

const app = express();
const port = 3004;


const upload = multer({ storage: multer.memoryStorage() });

const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_KEY
);
const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  sharedKeyCredential
);

app.post('/upload-audio', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No se encontró el archivo de audio');
    }
    console.log("enviando blob...");
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
    const blobName = `${Date.now()}-${req.file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(req.file.buffer, req.file.size);

    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 60);
    const sasUrl = blockBlobClient.generateSasUrl({
      permissions: 'r',
      expiresOn: expiryDate,
    });

    res.status(201).send({ message: 'Archivo subido con éxito', url: sasUrl });
  } catch (error) {
    console.error('Error al subir el archivo', error);
    res.status(500).send('Error al subir el archivo');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
