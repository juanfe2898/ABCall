// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AudioStorage {
    struct File {
        string metadata;      // Información del archivo como un string JSON
        address uploader;     // Dirección del uploader
        uint256 timestamp;    // Marca temporal de subida
    }

    // Mapeo para almacenar el archivo usando su hash como clave
    mapping(string => File) private files;

    // Evento para registrar que un archivo fue subido
    event FileUploaded(
        string indexed fileHash, 
        string metadata, 
        address indexed uploader, 
        uint256 timestamp
    );

    // Función para agregar un archivo (usa el hash como ID único)
    function uploadFile(
        string calldata _fileHash, 
        string calldata _metadata
    ) external {
        require(bytes(files[_fileHash].metadata).length == 0, "El archivo ya ha sido registrado.");

        // Almacenamos los datos del archivo
        files[_fileHash] = File({
            metadata: _metadata,
            uploader: msg.sender,
            timestamp: block.timestamp
        });

        // Emitimos el evento para indicar que el archivo fue subido
        emit FileUploaded(_fileHash, _metadata, msg.sender, block.timestamp);
    }

    // Función para obtener los detalles de un archivo específico
    function getFile(string calldata _fileHash) external view returns (
        string memory, address, uint256
    ) {
        require(bytes(files[_fileHash].metadata).length != 0, "El archivo no existe.");
        
        File memory file = files[_fileHash];
        return (
            file.metadata,
            file.uploader,
            file.timestamp
        );
    }

    // Función para verificar si un archivo específico coincide con un hash y su metadata
    function verifyFile(
        string calldata _fileHash, 
        string calldata _metadata
    ) external view returns (bool) {
        if (bytes(files[_fileHash].metadata).length == 0) {
            return false; // El archivo no existe
        }

        // Compara el metadata del archivo almacenado con el metadata proporcionado
        return keccak256(abi.encodePacked(files[_fileHash].metadata)) == keccak256(abi.encodePacked(_metadata));
    }
}
