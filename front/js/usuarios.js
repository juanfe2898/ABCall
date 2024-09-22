// Función para realizar la consulta
async function consultarUsuario() {
    const userId = document.getElementById('userId').value;
    const resultado = document.getElementById('result');

    // Limpiar resultados previos
    resultado.innerHTML = 'Buscando...';

    try {
        // Hacer el fetch con una consulta GET
       const response = await fetch(`http://10.0.195.238:3000/rest/incident_management/call/countByUser/user/${userId}`);
       //const response = await fetch(`http://172.212.120.235:3000/rest/incident_management/call/countByUser/user/${userId}`);
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Usuario no encontrado');
        }

        // Parsear la respuesta a JSON
        const usuario = await response.json();

        // Mostrar los datos del usuario
        resultado.innerHTML = `
            <p><strong>id de usuario:</strong> ${usuario.userId}</p>
            <p><strong>Cantidad de llamada:</strong> ${usuario.callCount}</p>
        `;
    } catch (error) {
        // Mostrar error en caso de que la consulta falle
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
