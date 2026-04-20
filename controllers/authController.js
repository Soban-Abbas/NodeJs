exports.getLogin =(req,res,next)=>{
    res.render('auth/login',{
        pageTitle:'Login',
        url:req.url,
        AuthenticUser:false

    })
}
exports.postLogin=(req,res,next)=>{
    res.cookie('isvalid','true',{
        httpOnly:true,
        maxAge:(24*60*60)*1000
    })
    res.redirect('/');
}