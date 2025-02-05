const { Router } = require('express');
const updateRouter = Router();
const updateController = require('../controllers/updateController');

updateRouter.get('/model', updateController.getUpdateModel)
updateRouter.post('/model', updateController.updateModelById)
updateRouter.post('/manufacturer', updateController.updateManufacturerByName)

module.exports = updateRouter;