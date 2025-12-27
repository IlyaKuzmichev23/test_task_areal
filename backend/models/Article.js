

const DataTypes = require("sequelize");
const sequelize = require("../connect_db");


const Article = sequelize.define(
    'Article',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        tableName:"articles",
        timestamps: true
    }
);

module.exports = Article;


