const Comment = require("../models/Comment");
const Article = require("../models/Article");

class CommentController{

    //Create
    async create(req,res){
        try{
            const {text} = req.body;
            const {articleId} = req.params;
            const comment = await Comment.create({text,articleId});
            return res.status(201).json(comment)
        }
        catch(error){
            return res.status(500).json({error:error.message});
        }
    }

    //Find all comments by articleId
    async getAllByArticle(req,res){
        const {articleId} = req.params;
        const article = await Article.findByPk(articleId);
        if (!article){
            return res.status(404).json({message: "Article not found"});
        }
        const comments = await Comment.findAll({ where: { articleId } });
        return res.json(comments)
    }

    //Find one comments by articleId and Id
    async getOneByArticle(req,res){
        const {id, articleId} = req.params;
        const article = await Article.findByPk(articleId);
        if (!article){
            return res.status(404).json({message: "Article not found"});
        }
        const comment = await Comment.findOne({where: {id,articleId}});
        if (!comment){
            return res.status(404).json({message: "Comment not found"});
        }
        return res.json(comment)
    }
    //Update comment
    async update(req,res){
        const {text} = req.body;
        const {id,articleId} = req.params;
        const article = await Article.findByPk(articleId);
        if (!article){
            return res.status(404).json({message: "Article not found"});
        }
        const comment = await Comment.findOne({where: {id,articleId}});
        if (!comment){
            return res.status(404).json({message: "Comment not found"});
        }
        comment.text = text ?? comment.text;
        await comment.save();

        return res.json(comment);
    }

    //Delete comment
    async delete(req, res){
        const {id,articleId} = req.params;
        const article = await Article.findByPk(articleId);
        if (!article){
            return res.status(404).json({message: "Article not found"});
        }
        const comment = await Comment.findOne({where: {id,articleId}});
        if (!comment){
            return res.status(404).json({message: "Comment not found"});
        }
        await comment.destroy();

        return res.json({message: "Comment deleted"});
    }
}

module.exports = new CommentController();