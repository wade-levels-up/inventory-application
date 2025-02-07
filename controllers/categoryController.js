require('dotenv').config();
const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const getAllModels = asyncHandler(async (req, res) => {
    try {
        const allModels = await db.getAllModels();
        res.render("pages/category", { title: "All models", models: allModels, adminpw: process.env.ADMINPW });
    } catch(error) {
        throw new Error(`Couldn't retrieve models data. Error: ${error}`)
    }
})

const getModelsByManufacturer = asyncHandler(async (req, res) => {
    try {
        const models = await db.getModelsByManufacturer(req.params.manufacturer);
        res.render("pages/category", { title: req.params.manufacturer, models: models, adminpw: process.env.ADMINPW});
    } catch(error) {
        throw new Error(`Couldn't retrieve models data. Error: ${error}`)
    }
})

module.exports = { getAllModels, getModelsByManufacturer }