module.exports = {
    async up(queryInterface){
        await queryInterface.bulkInsert("articles",[
            {
                title: "First article",
                content: "This is first article",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: "Second article",
                content: "This is second article",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface){
        await queryInterface.bulkInsert("articles", null,{})
    }
};