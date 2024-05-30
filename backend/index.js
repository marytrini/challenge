require('dotenv').config();
const app = require("./src/app");
const {conn} = require("./src/sequelize/index");

const PORT = process.env.PORT || 4000;


conn.sync({force: false}).then(()=>{
    console.log("DB connected to server");
    app.listen(PORT, ()=>{
        console.log(`server listening at ${PORT}`);
    })
})
