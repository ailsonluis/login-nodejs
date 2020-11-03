const db = require('./dbController')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { SECRET } = require('../.env')
const User = require('../models/user')

module.exports ={

    register: (req,res) =>{
       
        res.render('register.njk')
    },

    addRegister: async (req,res) =>{
        let message = {}
        let error = false
        const teste= await User.findAll()
        console.log(teste)
        const user = await User.findOne({where :{ email:req.body.email} } )

        //verifica se usuario ja é cadastrado
        if (user) {
            message = {
                type: "Danger",
                intro: "",
                text: "O e-mail informado já é cadastrado!"
            }    
            error = true
        }

       
        //verifica se senha são iguais
        if ( req.body.password != req.body.repeatpassword) {
            message = {
                type: "danger",
                intro: "",
                text: "As senhas indicadas devem ser idênticas!"
            }    
            error = true
        }
        console.log(message)
        if (error == true) {
            res.render('register.njk', { message })
        }else{
            if ( req.body.name || req.body.email || req.body.password || req.body.passwordrepeat ){
               
                const hash = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
               
                User.create( { name :req.body.name, 
                        email : req.body.email,
                        password:  hash,
                        active: 'S',
                        })
                console.log(hash)        
                let message = {
                    type: "success",
                    intro: "Acesso criado!",
                    text: ""
                }
                            
                            
               
                    
            
            res.render('register.njk',{message})
            }
        }    
    },
    

    getLogin: (req,res)=>{
        res.render('login.njk' )
    },

    signin: async (req,res)=>{
        //res.clearCookie('x-access-key');
        let pEmail = req.body.email
        let pPassword = req.body.password
        const user = await User.findOne({where :{ email:pEmail} } )
        
        if ( !pEmail || !pPassword){
            return res.status(400).send("Informe usuário e senha")
        }

        //const user = await.db('users').where({email: pEmail}).first()
        if (!user) return res.status(400).send("Usuário não existe")

       // const isMatch = bcrypt.compareSync(pPassword, user.password)
        //if (!isMatch) return res.status(401).send('Email/Senha inválidos!')

        if (user.active != 'S') return res.status(401).send('Usuário não esta ativo!')
        
        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            iat: now,
            //exp: now + (60 * 60 * 24 * 1) // expira em 1 dias
            exp: now + (60 * 60) // expira em 1 hora
        }
        let token =  jwt.sign(payload, SECRET)
        
        //console.log("payload",payload)
        //console.log("token", token)
      

        res.cookie('x-access-key', token)
            .redirect('/protectpage')
        
    },

    logout: (req,res)=>{
        res.clearCookie('x-access-key');
        res.redirect('/')
    }

}