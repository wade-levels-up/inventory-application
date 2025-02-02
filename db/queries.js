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

async function getModelsByManufacturer(manufacturer) {
    const { rows } = await pool.query(`
            SELECT models.name AS model_name, manufacturers.name AS make_name, year, price, imgUrl, odometer, description
            FROM models
            JOIN manufacturers ON models.makeKey = manufacturers.id
            WHERE manufacturers.name ILIKE ($1)
        `, [manufacturer]);
    return rows;
}

async function createNewManufacturer(manufacturer) {
    await pool.query(`
            INSERT INTO manufacturers (name)
            VALUES ($1)
        `, [manufacturer]);
}

async function createNewModel(model) {
    const { name, year, price, imgUrl, odometer, description, makeKey } = model;
    await pool.query(`
        INSERT INTO models (name, year, price, imgUrl, odometer, description, makeKey)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [name, year, price, imgUrl, odometer, description, makeKey]);
}

module.exports = { getAllManufacturers, getAllModels, getModelsByManufacturer, createNewManufacturer, createNewModel };

