const app = require("./app");
const sequelize = require("./connect_db");

const PORT = 3000;

async function start() {
    try{
        await sequelize.authenticate();
        console.log('DB connected');

        app.listen(PORT, ()=> {
            console.log('Server is started');
        });
    }
    catch(error){
        console.error('Error starting server: ', error);
    }  
}

start();