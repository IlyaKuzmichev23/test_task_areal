const Router = require('express');
const router = new Router();
const AnalyticController = require("../controllers/analytic.controller");

router.get("/analytic/comments", AnalyticController.getCommentsByPeriod);

module.exports = router;