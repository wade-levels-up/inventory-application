// db stuff

const asyncHandler = require('express-async-handler');

const getAllData = asyncHandler(async (req, res) => {
    res.render('pages/index', { title: 'Homepage'});
})

module.exports = { getAllData }