const { Router } = require('express');
const categoryRouter = Router();

const categoryController = require('../controllers/categoryController');

categoryRouter.get('/all', categoryController.getAllModels);

module.exports = categoryRouter