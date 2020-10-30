module.exports ={

    getIndex: (req,res)=>{
        res.render('index.njk',{ title:"teste!" } )
    }
}