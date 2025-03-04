const pool = require("./pool");

async function getAllManufacturers() {
  const { rows } = await pool.query("SELECT * FROM manufacturers");
  return rows;
}

async function getManufacturerById(id) {
  const { rows } = await pool.query(
    "SELECT id FROM manufacturers WHERE id = $1",
    [id]
  );
  return rows;
}

async function getAllModels() {
  const { rows } = await pool.query(`
            SELECT models.id, models.name AS model_name, manufacturers.name AS make_name, year, price, imgUrl, odometer, description
            FROM models
            JOIN manufacturers ON models.makeKey = manufacturers.id
        `);
  return rows;
}

async function getModelsByManufacturer(manufacturer) {
  const { rows } = await pool.query(
    `
            SELECT models.id, models.name AS model_name, manufacturers.name AS make_name, year, price, imgUrl, odometer, description
            FROM models
            JOIN manufacturers ON models.makeKey = manufacturers.id
            WHERE manufacturers.name ILIKE ($1)
        `,
    [manufacturer]
  );
  return rows;
}

async function createNewManufacturer(manufacturer) {
  await pool.query(
    `
            INSERT INTO manufacturers (name)
            VALUES ($1)
        `,
    [manufacturer]
  );
}

async function createNewModel(model) {
  const { name, year, price, imgUrl, odometer, description, makeKey } = model;
  await pool.query(
    `
        INSERT INTO models (name, year, price, imgUrl, odometer, description, makeKey)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
    [name, year, price, imgUrl, odometer, description, makeKey]
  );
}

async function getModelById(id) {
  const { rows } = await pool.query(`SELECT * FROM models WHERE id = ($1)`, [
    id,
  ]);
  return rows;
}

async function updateModelById(id, model) {
  const { name, year, price, imgUrl, odometer, description, makeKey } = model;
  await pool.query(
    `
        UPDATE models
        SET name = $1, year = $2, price = $3, imgUrl = $4, odometer = $5, description = $6, makeKey = $7
        WHERE id = $8
        `,
    [name, year, price, imgUrl, odometer, description, makeKey, id]
  );
}

async function deleteModelById(id) {
  await pool.query(`DELETE FROM models WHERE id = ($1)`, [id]);
}

async function updateManufacturerByName(oldName, newName) {
  await pool.query(`UPDATE manufacturers SET name = $1 WHERE name ILIKE $2`, [
    newName,
    oldName,
  ]);
}

async function deleteManufacturerByName(manufacturer) {
  await pool.query(
    `
        DELETE FROM models
        WHERE makeKey IN (SELECT id FROM manufacturers WHERE name ILIKE $1)
    `,
    [manufacturer]
  );
  await pool.query(`DELETE FROM manufacturers WHERE name ILIKE $1`, [
    manufacturer,
  ]);
}

module.exports = {
  getAllManufacturers,
  getManufacturerById,
  updateManufacturerByName,
  getAllModels,
  getModelById,
  updateModelById,
  getModelsByManufacturer,
  createNewManufacturer,
  createNewModel,
  deleteModelById,
  deleteManufacturerByName,
};
