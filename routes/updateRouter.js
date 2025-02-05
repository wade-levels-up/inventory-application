const { Router } = require('express');
const updateRouter = Router();
const updateController = require('../controllers/updateController');

updateRouter.get('/model', updateController.getUpdateModel)
updateRouter.get('/manufacturer', updateController.getUpdateManufacturer)
updateRouter.post('/model', updateController.updateModelById)
updateRouter.post('/manufacturer', updateController.updateManufacturerByName)

module.exports = updateRouter;