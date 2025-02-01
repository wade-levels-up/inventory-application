const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const getAllModels = asyncHandler(async (req, res) => {
    try {
        const allModels = await db.getAllModels();
        res.render("pages/category", { title: "All models", models: allModels});
    } catch(error) {
        throw new Error(`Couldn't retrieve models data. Error: ${error}`)
    }
})

module.exports = { getAllModels }