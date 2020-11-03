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
    //se não existir usuário cria um usuario admin@admin.com.br com senha 123456
    if (userAdmin === null){
        User.create({
            email:'admin@admin.com.br',
            password:'$2b$10$TFdHDlH.ko7HdWOTV2nbYe9u0WyIZX83f0pgGlXL1IqhbnXOKYj4G',
            name:'demo',
            active:'S'
        }) 
    }
}   

validAdmin()


module.exports = User