const userModel=require("../models/user")


exports.getLogin =(req,res,next)=>{

req.session.isvalid=false
   // console.log(req.session.isvalid)
    res.render('auth/login',{
        pageTitle:'Login',
        url:req.url,
        AuthenticUser:req.session.isvalid

    })

}
exports.postLogin=(req,res,next)=>{
    
    req.session.isvalid=true

        userModel.user.findById("69e49ed2823ade7a42341602").then((dbuser) => {
           // console.log(dbuser)
            req.session.userId = dbuser._id
            
            //  console.log(req.user)
            res.redirect('/');
        }).catch((err) => {
            console.log(err)
        })
    
  
}

exports.postLogout=(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err){
          return  console.log("Could not logout")
        }
        console.log("logout Successfull")
        res.redirect('/login')
    })
}