const { Router } = require('express');
const deleteRouter = Router();
const deleteController = require('../controllers/deleteController')

deleteRouter.post('/', deleteController.deleteModelById)

module.exports = deleteRouter;