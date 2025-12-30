const Comment = require("../models/Comment");
const {Op} = require("sequelize");
const Article = require("../models/Article");

class AnalyticController{
    async getCommentsByPeriod(req, res){

        try {
            const {dateFrom, dateTo} = req.query;

            const from = parseInt(dateFrom, 10);
            const to = parseInt(dateTo, 10);

            const comments = await Comment.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [new Date(from), new Date(to)]
                    }
                },
                include:[
                    {
                        model: Article,
                        attributes:['id', 'title']
                    }
                ],
                order: [
                    ['Article', 'id','ASC'],
                    ['createdAt','ASC']
                ]
            });

            const grouped ={};

            comments.forEach(comment=>{

                const article = comment.Article;
                const articleId = article.id;

                if (!grouped[articleId]){
                    grouped[articleId] = {
                        article:{
                            id:articleId,
                            title: article.title
                        },
                        comments: []
                    };
                }

                grouped[articleId].comments.push({
                    id:comment.id,
                    text: comment.text,
                    createdAt: comment.createdAt
                });
            });
            const result = Object.values(grouped);
            return res.json(result);
        }
        catch (error) {
            console.error("Error in grouping comments:", error);
            return res.status(500).json({ error: error.message });
        }

    }
}

module.exports = new AnalyticController();