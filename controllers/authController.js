exports.getLogin =(req,res,next)=>{
    res.render('auth/login',{
        pageTitle:'Login',
        url:req.url,
        AuthenticUser:false

    })
}
exports.postLogin=(req,res,next)=>{
    
    res.setHeader('set-cookie', ['a=1', 'isvalid=true; Max-Age=20; Secure']);
    res.redirect('/');
}