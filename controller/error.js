exports.erorr404=(req,res,next)=>{
    res.status(404).render('404',{docTitle:'error page',path:'/'})
}