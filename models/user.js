const db = require('../controller/dbController')

//Contas
const User = db.sequelize.define('users',{
    email:           { type : db.Sequelize.CHAR(100) },
    password:        { type: db.Sequelize.CHAR(200) },
    name :           { type: db.Sequelize.CHAR(100)  },
    active:          { type: db.Sequelize.CHAR(1)}
   
})

//Cria tabela se nao existe
 User.sync().then(() =>{
    console.log('tabela criada')
}).finally(()=>{
   // db.sequelize.close()
}) 


/*// Deleta
Account.drop().then(() => {
    console.log('table deleted');
}).finally(() => {
    sequelize.close();
});
 */

 //verifica se o usuario admin@admin.com.br existe, senao será criado
const getUserAdmin = async()=> await Promise.resolve(User.findOne({where :{ email:'admin@admin.com.br'} } ))

const validAdmin = async() => {
    const userAdmin = await getUserAdmin()
    
    if (userAdmin === null){
        User.create({
            email:'admin@admin.com.br',
            password:'1234567',
            name:'demo',
            active:'S'
        }) 
    }
}   

validAdmin()


module.exports = User