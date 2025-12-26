module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('comments', [
        {
            text: 'First comment',
            articleId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            text: 'Second comment',
            articleId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('comments', null, {});
    }
};
