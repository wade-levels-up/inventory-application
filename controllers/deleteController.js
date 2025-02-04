const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const deleteModelById = asyncHandler(async (req, res) => {
    try {
        await db.deleteModelById(req.query.id);
        const models = await db.getModelsByManufacturer(req.query.manufacturer);
        res.render("pages/category", { title: req.query.manufacturer, models: models});
    } catch(error) {
        throw new Error(`Couldn't delete model from database. Error: ${error}`)
    }
});

const deleteManufacturerByName = asyncHandler(async (req, res) => {
    try {
        await db.deleteManufacturerByName(req.query.manufacturer);
        console.log('Made it passed the db function... Inside controller')
        res.redirect('/');
    } catch(error) {
        throw new Error(`Couldn't delete manufacturer from database. Error: ${error}`)
    }
});

module.exports = { deleteModelById, deleteManufacturerByName }