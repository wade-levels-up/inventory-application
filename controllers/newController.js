const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const createNewManufacturer = asyncHandler(async (req, res) => {
    try {
        await db.createNewManufacturer(req.body.name);
        res.redirect('/')
    } catch(error) {
        throw new Error(`Unable to create new manufacturer - ${error}`);
    }
})

const getNewManufacturerForm = asyncHandler(async (req, res) => {
    try {
        res.render("pages/new", { title: 'New Manufacturer'});
    } catch(error) {
        throw new Error(`Unable to retrieve new manufacturer form - ${error}`)
    }
})

module.exports = { createNewManufacturer, getNewManufacturerForm }