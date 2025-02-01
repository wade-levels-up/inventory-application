const pool = require('./pool');

async function getAllManufacturers() {
    const { rows } = await pool.query("SELECT * FROM manufacturers");
    return rows;
}

module.exports = { getAllManufacturers };

