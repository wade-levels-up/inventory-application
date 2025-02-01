const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const getAllManufacturersData = asyncHandler(async (req, res) => {
    try {
        const allManufacturers = await db.getAllManufacturers(); 
        res.render('pages/index', { title: 'Homepage', manufacturers: allManufacturers});
    } catch(error) {
        throw new Error(`Couldn't retrieve manufacturer data. Error: ${error}`)
    }
})

const getAllModelsData = asyncHandler(async (req, res) => {
    try {
        const allModels = await db.getAllModels();
        res.render("pages/allmodels", { title: "All models", models: allModels});
    } catch(error) {
        throw new Error(`Couldn't retrieve models data. Error: ${error}`)
    }
})

module.exports = { getAllManufacturersData, getAllModelsData }