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

const getUpdateManufacturer = asyncHandler(async (req, res) => {
    try {
        const manufacturerName = req.query.name;
        res.render('pages/update', { title: 'Update Manufacturer', manufacturer: manufacturerName });
    } catch(error) {
        throw new Error(`Failed to update model: ${error}`);
    } 
})

const updateModelById = asyncHandler(async (req, res) => {
    try {
        await db.updateModelById(req.query.id, req.body)
        res.redirect('/');
    } catch(error) {
        throw new Error(`Failed to update model: ${error}`);
    }
})

const updateManufacturerByName = asyncHandler(async (req, res) => {
    try {
        await db.updateManufacturerByName(req.query.name, req.body.name)
        res.redirect('/');
    } catch(error) {
        throw new Error(`Failed to update manufacturer: ${error}`);
    }
})

module.exports = { getUpdateModel, updateModelById, updateManufacturerByName, getUpdateManufacturer }