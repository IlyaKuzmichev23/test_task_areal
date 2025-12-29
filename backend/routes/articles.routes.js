const Router = require('express');
const router = new Router();
const articleController = require('../controllers/article.controller');

router.post("/article", articleController.create);
router.get("/articles",articleController.getAll);
router.get("/article/:id",articleController.getOne);
router.patch('/article/:id',articleController.update);
router.delete('/article/:id',articleController. delete);

module.exports = router;
