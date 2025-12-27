const Article = require("../models/Article");

class ArticleController{

    //Create
    async create(req,res){
        try{
            const {title, text} = req.body;
            const article = await Article.create({title, text});
            return res.status(201).json(article)
        }
        catch (error){
            return res.status(500).json({error:error.message});
        }
    }

    //Get all 
    async getAll(req, res){
        const articles = await Article.findAll();
        return res.json(articles)
    }

    //Get by Id
    async geOne(req, res){
        const {id} = req.params;       
        const article = await Article.findByPk(id);     
        if (!article){
            return res.status(404).json({message: "Article not found"});
        }
        return res.json(article)
    }

    //Update
    async update(res,req){
        const {id} = req.params;
        const {title, text} = req.body;
        const article = await Article.findByPk(id);
        if(!article){
            return res.status(404).json({message: "Article not found"});
        }
        article.title = title ?? article.title;
        article.text = text ?? article.text;
        await article.save();

        return res.json(article);
    }

    //Delete
    async delete(req,res){
        const {id} = req.params;
        const article = await Article.findByPk(id);
        if(!article){
            return res.status(404).json({message: "Article not found"});
        }
        await article.destroy();
        
        return res.json({message: "Article deleted"});
    }
}

module.exports = new ArticleController();
