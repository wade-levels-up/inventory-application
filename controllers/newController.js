const db = require('../db/queries');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator')

const newManufacturerValidator = [
    body('name').trim(),
    body('name', 'Cannot be empty').notEmpty().withMessage('Name cannot be empty'),
    body('name', 'Cannot contain numbers').isAlpha().withMessage('Name cannot contain numbers'),
    body('name', 'Meets length requirements').isLength({ min: 1, max: 30 }).withMessage(`Name cannot be less than 1 character long or greater than 30 characters long`)
]

const newModelValidator = [
    body('name').trim()
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ min: 1, max: 30 }).withMessage(`Name cannot be less than 1 character long or greater than 30 characters long`),
    body('year').trim()
        .notEmpty().withMessage('Year cannot be empty')
        .isInt({ min: 1800, max: 9999, allow_leading_zeroes: false}).withMessage(`Year must be a number between 1800 and 9999 with no leading 0's`),
    body('price').trim()
        .notEmpty().withMessage('Price cannot be empty')
        .isInt({ min: 1, max: 9999999, allow_leading_zeroes: false}).withMessage(`Price must be a number between 1 and 9999999 with no leading 0's`),
    body('imgUrl').trim()
        .notEmpty().withMessage('Image URL cannot be empty')
        .isURL({ require_tld: true }).withMessage('Must be a valid URL'),
    body('odometer').trim()
        .notEmpty().withMessage('Odometer cannot be empty')
        .isInt({ min: 1, max: 999999, allow_leading_zeroes: false}).withMessage(`Odometer must be a number between 1 and 999999 with no leading 0's`),
    body('description').trim()
        .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters long'),
    body('makeKey').trim()
        .notEmpty().withMessage('Manufacturer cannot be empty')
        .isInt().withMessage('Manufacturer ID must be an integer')
        .custom(async (value) => {
            const rows = db.getManufacturerById(value);
            if (rows.length === 0) {
                throw new Error('Invalid manufacturer ID');
            }
            return true;
        })
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

const getNewModelForm = asyncHandler(async (req, res) => {
    try {
        const allManufacturers = await db.getAllManufacturers();
        res.render("pages/new", { title: 'New Model', manufacturers: allManufacturers}); 
    } catch(error) {
        throw new Error(`Unable to retrieve new model form - ${error}`)
    }
});

const createNewModel = [
    newManufacturerValidator,
    asyncHandler(async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const allManufacturers = await db.getAllManufacturers();
                return res.status(400).render("pages/new", { title: 'New Model', manufacturers: allManufacturers, errors: errors.array()})
            }
            await db.createNewModel(req.body);
            res.redirect('/')
        } catch(error) {
            throw new Error(`Unable to create new model - ${error}`);
        }
})];

module.exports = { createNewManufacturer, getNewManufacturerForm, getNewModelForm, createNewModel }