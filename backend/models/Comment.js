const DataTypes = require("sequelize");
const sequelize = require("../connect_db");

const Comment = sequelize.define(
    'Comment',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        articleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'comments',
        timestamps: true,
    }
);

module.exports = Comment;

const Article = require('./Article'); 

Article.hasMany(Comment, {
    foreignKey: 'articleId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Article, {
    foreignKey: 'articleId'
});