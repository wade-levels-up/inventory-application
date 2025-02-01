const pool = require('./pool');

async function getAllManufacturers() {
    const { rows } = await pool.query("SELECT * FROM manufacturers");
    return rows;
}

async function getAllModels() {
    const { rows } = await pool.query(`
            SELECT models.name AS model_name, manufacturers.name AS make_name, year, price, imgUrl, odometer, description
            FROM models
            JOIN manufacturers ON models.makeKey = manufacturers.id
        `);
    return rows;
}

module.exports = { getAllManufacturers, getAllModels };

