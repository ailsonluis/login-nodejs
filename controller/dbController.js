const Sequelize  = require('sequelize')

const sequelize = new Sequelize({
    dialect : 'sqlite',
    storage : './database/database.sqlite'
})

try{
   sequelize.authenticate();
    console.log("Conexao ok!")
}catch(error){
    console.log("erro!")
}



module.exports = { 
    Sequelize : Sequelize,
    sequelize : sequelize
}