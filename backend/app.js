const express = require('express');
const articleRoutes = require("./routes/articles.routes");

const app = express();

app.use(express.json());
app.use(articleRoutes);     

module.exports = app;