'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('articles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },

        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },

        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('articles');
    },
};
