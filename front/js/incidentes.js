async function consultarIncidentes() {
    const incidentId = document.getElementById('incidentId').value;
    const resultado = document.getElementById('result');
 
    // Limpiar resultados previos
    resultado.innerHTML = 'Buscando...';
 
    try {
        // Hacer la solicitud fetch con un POST al endpoint GraphQL
 
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // GraphQL query para incidentes
        const raw = JSON.stringify({
            query: `{
                incidents {
                    idIncidente
                    tipoIncidente
                    descripcionIncidente
                    fechaIncidente
                    estadoIncidente
                    usuario {
                        idUsuario
                        nombreUsuario
                        cedula
                        emailUsuario
                        telefonoUsuario
                        direccionUsuario
                    }
                }
            }`
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
 
        // Hacer la solicitud fetch y esperar la respuesta
        const response = await fetch("http://10.0.46.58:4000/graphql/incident_management/incident/", requestOptions);
 
        // Verificar si la respuesta fue exitosa (si el fetch tuvo éxito)
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
 
        // Parsear la respuesta a JSON
        const data = await response.json();
 
        // Verificar si la respuesta de GraphQL contiene datos
        if (data.errors) {
            throw new Error(data.errors[0].message || 'Error en la consulta GraphQL');
        }
 
        const incidentes = data.data.incidents;
 
        // Verificar si hay incidentes
        if (!incidentes || incidentes.length === 0) {
            throw new Error('No se encontraron incidentes para este usuario');
        }
 
        // Mostrar los incidentes
        let incidentesHTML = '';
        incidentes.forEach(incidente => {
            const fecha = new Date(parseInt(incidente.fechaIncidente));
            incidentesHTML += `
<div class="incident">
<p><strong>ID Incidente:</strong> ${incidente.idIncidente}</p>
<p><strong>Tipo de Incidente:</strong> ${incidente.tipoIncidente}</p>
<p><strong>Descripción:</strong> ${incidente.descripcionIncidente}</p>
<p><strong>Fecha:</strong> ${fecha.toLocaleDateString()}</p>
<p><strong>Estado:</strong> ${incidente.estadoIncidente}</p>
<p><strong>Usuario:</strong> ${incidente.usuario.nombreUsuario}</p>
<p><strong>Cédula:</strong> ${incidente.usuario.cedula}</p>
<p><strong>Email:</strong> ${incidente.usuario.emailUsuario}</p>
<p><strong>Teléfono:</strong> ${incidente.usuario.telefonoUsuario}</p>
<p><strong>Dirección:</strong> ${incidente.usuario.direccionUsuario}</p>
</div>
<hr>
            `;
        });
 
        // Mostrar los resultados en el HTML
        resultado.innerHTML = incidentesHTML;
 
    } catch (error) {
        // Mostrar mensaje de error si la consulta falla
        resultado.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
 
// Función para redirigir a la página de clientes
function volver() {
    const resultado = document.getElementById('result');
    resultado.style.display = 'block';
    resultado.innerHTML = '<p>Redirigiendo a la página de inicio...</p>';
    // Redirigir a la página de inicio
    window.location.href = '/index.html';
}