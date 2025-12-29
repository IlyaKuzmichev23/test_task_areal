const Router = require('express');
const router = new Router();
const commentController = require('../controllers/comment.controller');

router.post("/article/:articleId/comment", commentController.create);
router.get("/article/:articleId/comments",commentController.getAllByArticle);
router.get("/article/:articleId/comment/:id",commentController.getOneByArticle);
router.patch('/article/:articleId/comment/:id',commentController.update);
router.delete('/article/:articleId/comment/:id',commentController.delete);

module.exports = router;