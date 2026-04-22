exports.getLogin =(req,res,next)=>{

req.session.isvalid=false
    console.log(req.session.isvalid)
    res.render('auth/login',{
        pageTitle:'Login',
        url:req.url,
        AuthenticUser:req.session.isvalid

    })

}
exports.postLogin=(req,res,next)=>{
    
    req.session.isvalid=true
    
    res.redirect('/');
}