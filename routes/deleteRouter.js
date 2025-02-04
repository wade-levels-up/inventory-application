const { Router } = require('express');
const deleteRouter = Router();
const deleteController = require('../controllers/deleteController')

deleteRouter.post('/model', deleteController.deleteModelById)
deleteRouter.post('/manufacturer', deleteController.deleteManufacturerByName)

module.exports = deleteRouter;