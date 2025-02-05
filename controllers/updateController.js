const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const getUpdateModel = asyncHandler(async (req, res) => {
    try {
        const allManufacturers = await db.getAllManufacturers();
        const model = await db.getModelById(req.query.modelId);
        res.render('pages/update', { title: 'Update Model', manufacturers: allManufacturers, model: model[0] });
    } catch(error) {
        throw new Error(`Failed to update model: ${error}`);
    } 
})

const updateModelById = asyncHandler(async (req, res) => {
    try {
        console.log('Inside updateController')
        console.log(req.query.id, req.body.name)
        await db.updateModelById(req.query.id, req.body)
        res.redirect('/');
    } catch(error) {
        throw new Error(`Failed to update model: ${error}`);
    }
})

const updateManufacturerByName = asyncHandler(async (req, res) => {
    try {

    } catch(error) {
        throw new Error(`Failed to update model: ${error}`);
    }
})

module.exports = { getUpdateModel, updateModelById, updateManufacturerByName }