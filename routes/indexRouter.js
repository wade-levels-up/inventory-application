const { Router } = require('express');
const indexRouter = Router();

const indexController = require('../controllers/indexController');

indexRouter.get('/', indexController.getAllManufacturersData);
indexRouter.get('/all', indexController.getAllModelsData);

module.exports = indexRouter