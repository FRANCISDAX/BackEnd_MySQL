const mysql = require( 'mysql2/promise' );
const dotenv = require( 'dotenv' );

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORT_MYSQL,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Función para ejecutar consultas SQL
async function runQuery( sql, values = [] ) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute( sql, values );
        return result;
    } finally {
        connection.release();
    }
}

module.exports = {
    runQuery
};
