module.exports ={

    getPage: (req,res)=>{
        let sessionUser = req.cookies['x-access-key']
        
        
        res.render('protectpage.njk',{ sessionUser} )
    }
}