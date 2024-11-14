require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.27", // Asegúrate de que la versión sea la misma que la de tu contrato
  defaultNetwork: "polygon", // Especificamos que por defecto usaremos la red Polygon
  networks: {
    polygon: {
      url: process.env.RPC_URL, // Usamos la URL RPC de Polygon proporcionada
      accounts: [process.env.PRIVATE_KEY], // Usamos la clave privada desde el archivo .env
      gasPrice: 20000000000, // Opcional: puedes ajustar el precio del gas si es necesario
      chainId: 137, // ID de la red Polygon Mainnet
    },
  },
};
