const db = require('../db/queries');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator')

const newManufacturerValidator = [
    body('name').trim(),
    body('name', 'Cannot be empty').notEmpty().withMessage('Name cannot be empty'),
    body('name', 'Cannot contain numbers').isAlpha().withMessage('Name cannot contain numbers'),
    body('name', 'Meets length requirements').isLength({ min: 1, max: 30 }).withMessage(`Name cannot be less than 1 character long or greater than 30 characters long`)
]

const createNewManufacturer = [
    newManufacturerValidator,
    asyncHandler(async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).render("pages/new", { title: 'New Manufacturer', errors: errors.array()})
            }
            await db.createNewManufacturer(req.body.name);
            res.redirect('/')
        } catch(error) {
            throw new Error(`Unable to create new manufacturer - ${error}`);
        }
})]

const getNewManufacturerForm = asyncHandler(async (req, res) => {
    try {
        res.render("pages/new", { title: 'New Manufacturer'});
    } catch(error) {
        throw new Error(`Unable to retrieve new manufacturer form - ${error}`)
    }
})

module.exports = { createNewManufacturer, getNewManufacturerForm }