const ethers = require("ethers")

const provider = new ethers.providers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/wgiyf_XZNGGi8qoA61y1TV55q4MkyW4U");


const contractAddress = "0x1f8F5e5624264Efb258F028d4d022d5c154F4f3F"

const abi = [
    {
        "inputs": [
          { "internalType": "string", "name": "_fileHash", "type": "string" },
          { "internalType": "string", "name": "_metadata", "type": "string" }
        ],
        "name": "uploadFile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          { "internalType": "string", "name": "_fileHash", "type": "string" }
        ],
        "name": "getFile",
        "outputs": [
          { "internalType": "string", "name": "", "type": "string" },
          { "internalType": "address", "name": "", "type": "address" },
          { "internalType": "uint256", "name": "", "type": "uint256" },
          { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          { "internalType": "string", "name": "_fileHash", "type": "string" },
          { "internalType": "string", "name": "_metadata", "type": "string" }
        ],
        "name": "verifyFile",
        "outputs": [
          { "internalType": "bool", "name": "", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          { "indexed": true, "internalType": "string", "name": "fileHash", "type": "string" },
          { "indexed": false, "internalType": "string", "name": "metadata", "type": "string" },
          { "indexed": true, "internalType": "address", "name": "uploader", "type": "address" },
          { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "name": "FileUploaded",
        "type": "event"
      }
];
const privateKey = "7dfe16f575f62ad6f80e66415db1d1520c614bba32115f3206ecf98d7b6ba06b"; // Reemplaza con tu clave privada

// Crear una instancia del wallet con el proveedor
const wallet = new ethers.Wallet(privateKey, provider);

// Crear una instancia del contrato
const contract = new ethers.Contract(contractAddress, abi, wallet);

async function queryUploadFileContract(fileHash,metadata) {
  try {    
    const address = "0x10E60FaA341cC989B6FDba20E1deDB17A3fFC81A"
    const tx = await contract.uploadFile(fileHash, metadata);
    console.log("Transacción enviada. Esperando confirmación...");
    const receipt = await tx.wait();
    console.log("Transacción confirmada:", receipt);
  } catch (error) {
    console.error("Error al consultar el contrato:", error);
  }
}

const fileHash = "hash_del_archivo_aqui";
const metadata = '{"nombre": "archivo1.mp3", "descripcion": "Archivo de audio"}';
queryUploadFileContract(fileHash, metadata);

