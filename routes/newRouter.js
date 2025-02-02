const { Router } = require('express');
const newRouter = Router();

const newController = require('../controllers/newController');

newRouter.get('/manufacturer', newController.getNewManufacturerForm);
newRouter.post('/manufacturer', newController.createNewManufacturer);

module.exports = newRouter;