require('dotenv').config();
const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { ethers } = require('ethers');
const { z } = require('zod');
// Configuración del provider usando el RPC_URL de Alchemy o cualquier otro servicio RPC confiable
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// Inicialización del Thirdweb SDK usando el secret key para autenticación
const sdk = new ThirdwebSDK(provider, { secretKey: process.env.THIRDWEB_SECRET_KEY });


const contractABI = [
  "function uploadFile(string memory _fileHash, string memory _metadata) public",
  "function getFile(string memory _fileHash) public view returns (string memory, address, uint256, uint256)",
  "function verifyFile(string memory _fileHash, string memory _metadata) public view returns (bool)"
];
// Dirección del contrato
const contractAddress = process.env.CONTRACT_ADDRESS;
const fileSchema = z.object({
  fileHash: z.string().min(1, "El hash del archivo no puede estar vacío"), // Hash del archivo, debería ser un string
  metadata: z.string().min(1, "La metadata debe ser un string válido"), // Metadata como string JSON
  fileSize: z.number().positive("El tamaño del archivo debe ser positivo"), // Tamaño del archivo en bytes
  fileType: z.string().min(1, "El tipo de archivo no puede estar vacío"), // Tipo de archivo, por ejemplo 'audio/mp3'
});
// Función para inicializar y conectar al contrato en Thirdweb
async function initContract() {
  try {
    const contract = await sdk.getContract(contractAddress);
    console.log("Contrato inicializado exitosamente:", contract);
    
    const fileData = {
      fileHash: 'a602751fb0290e6d71fd64ea9fb53de0', // Hash de ejemplo
      metadata: JSON.stringify({ name: "audioFile", description: "Descripción del archivo" }), // String JSON
      fileSize: 123456, // Tamaño del archivo en bytes
      fileType: "audio/mp3", // Tipo de archivo
    };

    // Validación de los datos antes de pasarlos al contrato
    //const parsedData = fileSchema.parse(fileData); // Si los datos no son válidos, esto lanzará un error


    const tx =await contract.call("uploadFile", "0xa602751fb0290e6d71fd64ea9fb53de0", "1");
    // const fileHash = "0xa602751fb0290e6d71fd64ea9fb53de0"; // Asegúrate de que el hash esté correctamente formateado como bytes32
    // const fileDetails = await contract.call("getFile", fileHash);

  } catch (error) {
    console.error("Error al inicializar el contrato:", error);
  }
}

// Llamar a la función de inicialización
initContract();
