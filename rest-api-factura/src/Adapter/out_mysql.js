const mysql = require('mysql2/promise');

class BillRepository {
  
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


  async getBillByIdRepository(billId) {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM factura WHERE idUsuario = ?',
        [billId]
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

  async createBill(billId, billData) {
    
        let connection;
        try {
            connection = await this.pool.getConnection();

            const { name, amount } = billData;
            const queryString = "INSERT factura SET nombreUsuario = " + name +", valorFactura = " + amount +", idFactura = " + billId +"";
            const result = await connection.query(
                'INSERT factura SET nombreUsuario = ?, valorFactura = ?, idFactura = ?',
                [name, amount, billId]
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


const instance = new BillRepository();
Object.freeze(instance);

module.exports = instance;
