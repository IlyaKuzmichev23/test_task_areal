const express = require('express');
const articleRoutes = require("./routes/articles.routes");
const commentRoutes = require("./routes/comments.routes");
const analyticRoutes = require("./routes/analytics.routes");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(articleRoutes);
app.use(commentRoutes); 
app.use(analyticRoutes);

module.exports = app;