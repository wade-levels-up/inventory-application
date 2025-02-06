const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const getAllManufacturersData = asyncHandler(async (req, res) => {
    try {
        const allManufacturers = await db.getAllManufacturers(); 
        res.render('pages/index', { title: 'autosales', manufacturers: allManufacturers});
    } catch(error) {
        throw new Error(`Couldn't retrieve manufacturer data. Error: ${error}`)
    }
})

module.exports = { getAllManufacturersData }