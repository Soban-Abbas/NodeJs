
const userModel = require("../models/user")
const bcrypt = require('bcrypt');
const emailTransporter = require("../util/sendemail");
const { validationResult }=require("express-validator")
exports.getLogin = (req, res, next) => {

    let message = req.session.errormessage
    req.session.errormessage = '';


    // console.log(req.session.isvalid)
    res.render('auth/login', {
        pageTitle: 'Login',
        url: req.url,
        errorMessage: message || null,
        AuthenticUser: req.session.isLogin || false

    })

}
exports.postLogin = async (req, res, next) => {

    // req.session.isvalid = true



    console.log(req.body)

    try {
    
        let userexist = await userModel.user.findOne({ email: req.body.email.trim().toLowerCase() })

        if (!userexist) {

            req.session.errormessage = "Wrong Email or Password"
            return res.redirect('/login')
        }
        const comparePasswordTohash = await bcrypt.compare(req.body.password, userexist.password)
        if (!comparePasswordTohash) {
            req.session.errormessage = "Wrong Email or Password"
            return res.redirect('/login')
        }

        req.session.userId = userexist._id;
        req.session.isLogin = true
        let redirectUrl = req.session.returnTo || '/'
        delete req.session.returnTo
        res.redirect(redirectUrl)


    } catch (error) {
        console.log(error)
    }







    // userModel.user.findById("69e49ed2823ade7a42341602").then((dbuser) => {
    //     // console.log(dbuser)
    //     req.session.userId = dbuser._id

    //     //  console.log(req.user)
    //     res.redirect('/');
    // }).catch((err) => {
    //     console.log(err)
    // })


}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log("Could not logout")
        }
        res.clearCookie('connect.sid');
        console.log("logout Successfull")
        res.redirect('/login')
    })
}

exports.getSignup = (req, res, next) => {
    let message = req.session.errormessage;
    req.session.errormessage = '';
    res.render('auth/signup', {
        pageTitle: 'Signup',
        url: req.url,
        AuthenticUser: req.session.isvalid,
        errorMessage: message || null,
        oldValues:{}
    })
}

exports.postSignup = async (req, res, next) => {
    try {

        const errors = validationResult(req)
        console.log(errors)
      if(!errors.isEmpty()){
     return  res.status(422).render("auth/signup",{
        pageTitle:"Sign up",
        url:req.url,
         AuthenticUser:req.session.isvalid,
         errorMessage:errors.mapped(),
         oldValues:{
            email:req.body.email,
            password:req.body.password,
            confirm_password:req.body.confirm_password
         }

     })
      }

//________this validation is  already done in validation before req reaches to contoler handler 


        // if (req.body.password !== req.body.confirm_password) {
        //     req.session.errormessage = "password mismatch";
        //     return res.redirect('/signup');
        // }
         let email = req.body.email;
         email = email.trim().toLowerCase();
        // const existEmail = await userModel.user.findOne({ email });
        // if (existEmail) {
        //     req.session.errormessage = "Email Alredy Registered";
        //     return res.redirect('/signup')
        // }
        const encryptedPassword = await bcrypt.hash(req.body.password, 6)
        const newUser = new userModel.user({
            email: email,
            password: encryptedPassword,
            cart: { items: [] }
        })


        await newUser.save()



        const info = await emailTransporter.transporter.sendMail({
            from: ` Shop Team <${process.env.emailuser}>`, // sender address
            to: `${email}`, // list of recipients
            subject: "WellCome To Shop", // subject line
            text: "You Have Successfuly SignUp At Shop", // plain text body
            html: `
  <div style="font-family: Arial; background:#f4f4f4; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:8px;">
      
      <h2 style="color:#333;">Welcome to Shop 🎉</h2>

      <p style="color:#555;">
        Your account has been created successfully.
      </p>

      <p style="color:#555;">
        You can now login and start using the app.
      </p>

      <a href="http://localhost:3000/login"
         style="display:inline-block; padding:10px 20px; background:#007bff; color:white; text-decoration:none; border-radius:5px;">
         Login Now
      </a>

      <hr style="margin:20px 0;" />

      <p style="font-size:12px; color:#999;">
        If you didn’t create this account, ignore this email.
      </p>

    </div>
  </div>
` // HTML body
        });



        console.log('user register')
        res.redirect('/login')


    } catch (error) {
        console.log(error)
    }

}