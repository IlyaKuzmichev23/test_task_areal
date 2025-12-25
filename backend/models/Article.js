// const sequelize = require('./connect_db');

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })();

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


