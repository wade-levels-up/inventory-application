const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const deleteModelById = asyncHandler(async (req, res) => {
    console.log('In the controller');
    try {
        await db.deleteModelById(req.query.id);
        const models = await db.getModelsByManufacturer(req.query.manufacturer);
        res.render("pages/category", { title: req.query.manufacturer, models: models});
    } catch(error) {
        throw new Error(`Couldn't delete model from database. Error: ${error}`)
    }
});

module.exports = { deleteModelById }