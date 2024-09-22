const incidentRepository = require('../Adapter/out_mysql');

async function getIncidents() {
  try {
    const incidents = await incidentRepository.getAllIncidentsWithUsers();
    return incidents;
  } catch (error) {
    throw new Error('Error al obtener los incidentes.');
  }
}

module.exports = getIncidents;
