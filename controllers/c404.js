const error404=(req,res,next)=>{
    res.render("404",
        {
            pageTitle:404,
            url:req.url,
        });
}

module.exports=error404;