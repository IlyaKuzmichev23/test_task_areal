const express = require('express');
const articleRoutes = require("./routes/articles.routes");
const commentRoutes = require("./routes/comments.routes");
const analyticRoutes = require("./routes/analytics.routes");

const app = express();

app.use(express.json());
app.use(articleRoutes);
app.use(commentRoutes); 
app.use(analyticRoutes);

module.exports = app;