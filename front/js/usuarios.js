// Función para realizar la consulta
async function consultarUsuario() {
    const userId = document.getElementById('userId').value;
    const resultado = document.getElementById('result');

    // Limpiar resultados previos
    resultado.innerHTML = 'Buscando...';

    try {
        // Hacer el fetch con una consulta GET
       const response = await fetch(`http://10.0.195.238:3000/rest/incident_management/call/user/${userId}`);
       //const response = await fetch(`http://172.212.120.235:3000/rest/incident_management/call/countByUser/user/${userId}`);
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Usuario no encontrado');
        }


        const callResponse = await response.json();

        resultado.innerHTML = `
            <p><strong>id de usuario:</strong> ${callResponse.idLlamada}</p>
            <p><strong>Fecha llamada:</strong> ${callResponse.fechaLlamada}</p>
             <p><strong>Calificacion:</strong> ${callResponse.calificacion}</p>
            <p><strong>id de usuari:</strong> ${callResponse.idUsuario}</p>
        `;
    } catch (error) {
        resultado.innerHTML = `<p>${error.message}</p>`;
    }
}

// Función para mostrar la consulta de clientes
function volver() {
    const resultado = document.getElementById('result');
    resultado.style.display = 'block';
    resultado.innerHTML = '<p>Redirigiendo a la página de inicio...</p>';
    
    // Aquí podrías redirigir a la página de clientes
     window.location.href = '/index.html';
}
