// Función para mostrar la consulta de incidentes
function mostrarIncidente() {
    const resultado = document.getElementById('result');
    resultado.style.display = 'block';
    resultado.innerHTML = '<p>Redirigiendo a la página de consulta de Incidente...</p>';
    
    // Aquí podrías redirigir a la página de incidentes
     window.location.href = '/incidentes.html';
}

// Función para mostrar la consulta de clientes
function mostrarCliente() {
    const resultado = document.getElementById('result');
    resultado.style.display = 'block';
    resultado.innerHTML = '<p>Redirigiendo a la página de consulta de Cliente...</p>';
    
    // Aquí podrías redirigir a la página de clientes
     window.location.href = '/usuarios.html';
}
