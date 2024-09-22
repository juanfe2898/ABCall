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


  async getCallByIdRepository(userId) {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM llamada WHERE idUsuario = ?',
        [userId]
      );
      return rows[0];
    } catch (error) {
      console.error('Error al conectar a la base de datos o ejecutar la consulta:', error.message);
      throw new Error('Error al conectar a la base de datos. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }


  async getCountByUserId(userId) {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const [rows] = await connection.query(
        'SELECT COUNT(*) AS callCount FROM llamada WHERE idUsuario = ?',
        [userId]
      );
      return rows[0].callCount;
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
