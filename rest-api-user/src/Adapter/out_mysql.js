const mysql = require('mysql2/promise');

class CallRepository {
  
  constructor() {
    const host = 'db-abcall.mysql.database.azure.com';
    this.pool = mysql.createPool({
      host: host,
      user: 'abcalladm',
      password: 'Archng2024*',
      database: 'abcall',
      port: 3306,
      ssl: {
        rejectUnauthorized: true
      }
    });
  }

  
  async updateUserById(userId, userData) {
    let connection;
    try {
      connection = await this.pool.getConnection();

      const { name, email } = userData;
      const result = await connection.query(
        'UPDATE usuario SET nombreUsuario = ?, emailUsuario = ? WHERE idUsuario = ?',
        [name, email, userId]
      );

      return result[0].affectedRows;
    } catch (error) {
      console.error('Error al conectar a la base de datos o ejecutar la consulta:', error.message);
      throw new Error('Error al conectar a la base de datos. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}


const instance = new CallRepository();
Object.freeze(instance);

module.exports = instance;
