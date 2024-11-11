// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenSequence {

    // Estructura de la información que se guardará en el contrato
    struct Info {
        uint256 tokenId;
        string data;
    }

    // Mapeo para almacenar la información relacionada a cada token
    mapping(uint256 => Info) private tokenInfo;

    // Contador de tokens
    uint256 private tokenCounter;

    // Dirección del dueño del contrato (solo él puede generar nuevos tokens)
    address public owner;

    // Evento que se emite cuando se crea un nuevo token
    event TokenCreated(uint256 tokenId, string data);

    // Constructor para inicializar el contrato y asignar el dueño
    constructor() {
        owner = msg.sender;
        tokenCounter = 0;
    }

    // Modificador para restringir acceso a funciones solo al dueño del contrato
    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el propietario puede crear tokens.");
        _;
    }

    // Función para crear un nuevo token y almacenar información
    function createToken(string memory _data) public onlyOwner returns (uint256) {
        tokenCounter += 1;
        uint256 newTokenId = tokenCounter;

        // Guardamos la información en el mapeo
        tokenInfo[newTokenId] = Info(newTokenId, _data);

        // Emitimos el evento para notificar la creación del token
        emit TokenCreated(newTokenId, _data);

        return newTokenId;
    }

    // Función para obtener la información de un token por su ID
    function getTokenInfo(uint256 _tokenId) public view returns (uint256, string memory) {
        require(_tokenId > 0 && _tokenId <= tokenCounter, "Token no existe.");
        Info memory info = tokenInfo[_tokenId];
        return (info.tokenId, info.data);
    }

    // Función para obtener el total de tokens generados
    function totalTokens() public view returns (uint256) {
        return tokenCounter;
    }
}
