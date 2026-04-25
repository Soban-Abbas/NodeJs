exports.isAuth=(req,res,next)=>{
if(!req.session.isLogin){
    req.session.errormessage="Please login first";
    req.session.returnTo=req.originalUrl
   return  res.redirect('/login')
}
next()
}
