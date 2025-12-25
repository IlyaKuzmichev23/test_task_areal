'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('comments', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        text: {
            type: Sequelize.TEXT,
            allowNull: false,
        },

        articleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
            model: 'articles',
            key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
        await queryInterface.dropTable('comments');
    },
};
