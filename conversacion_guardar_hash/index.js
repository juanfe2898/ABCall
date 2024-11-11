require('dotenv').config();
const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const ethers = require('ethers');


const provider = new ethers.providers.JsonRpcProvider("https://thirdweb.com/contracts/deploy/QmXRFGW4g4roxmaNkYLz4mWg6n2JHHrszt2CEcwfhFnkfa");


const sdk = new ThirdwebSDK(provider);


const contractAddress = "0x10E60FaA341cC989B6FDba20E1deDB17A3fFC81A";


const contract = sdk.getContract(contractAddress);

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


async function getContractData() {
  try {

    const totalTokens = await contract.getTokenInfo.call();
    console.log("Total Tokens:", totalTokens);


    console.log("Token Info:", tokenInfo);
  } catch (error) {
    console.error("Error while fetching data:", error);
  }
}

// Example of calling the functions
getContractData();

