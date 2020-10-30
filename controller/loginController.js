module.exports ={

    getLogin: (req,res)=>{
        res.render('login.njk' )
    },

    signin: (req,res)=>{
        res.json( {"usuario": req.body.email} )
    }
}