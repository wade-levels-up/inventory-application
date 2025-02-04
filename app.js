require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('node:path');

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/indexRouter');
const categoryRouter = require('./routes/categoryRouter');
const newRouter = require('./routes/newRouter');
const deleteRouter = require('./routes/deleteRouter');

app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/new', newRouter);
app.use('/delete', deleteRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(`Application encounter an error: ${err.message}`);
});

app.listen(PORT, () => console.log(`Application live at: http://localhost:${PORT}`));


