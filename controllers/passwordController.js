const userModel = require('../models/user')
const crypto = require("crypto")
const bcrypt=require("bcrypt")
const emailTransporter = require("../util/sendemail")
exports.getResetPassword = (req, res, next) => {
    let message = req.session.errormessage
    req.session.errormessage = '';
    res.render('passwords/getemailform', {
        pageTitle: 'Reset-Password',
        url: req.url,
        errorMessage: message || null,
        AuthenticUser: req.session.isLogin || false
    })
}

exports.postResetEmail = async (req, res, next) => {
    try {

        const email = req.body.email
        const user = await userModel.user.findOne({ email })
        if (!user) {
            req.session.errormessage = "Email Not register"
            return res.redirect('/reset-password')
        }
        let token = await crypto.randomBytes(32).toString("hex");

        const updatedUser = await userModel.user.updateOne({ _id: user._id }, { token: token, tokenExpiry: Date.now() + 3600000 })
   

        let sendingemail = await emailTransporter.transporter.sendMail({
            from: ` Shop Team <${process.env.emailuser}>`, // sender address
            to: `${email}`, // list of recipients
            subject: "Reset Password", // subject line
            text: "You Have Successfuly SignUp At Shop", // plain text body
            html: `<p>Click the link to reset password
              <a href="http://localhost:3000/reset-password-form/${token}" to reset Password>Reset Password</a></p>`
        })

        req.session.errormessage = "Check email to reset Password"
        res.redirect('/reset-password')



    } catch (error) {
        console.log(error)
    }


}


exports.getResetForm = async (req, res, next) => {

    try {
        console.log(req.params.token.length)
//let token=String(req.params.token)
        const user = await userModel.user.findOne({
            token: req.params.token, tokenExpiry: { $gt: Date.now() }
})
        //
        if (!user) {
            console.log(user);
            return res.send("token Expires")
        }
let message= req.session.errormessage;
req.session.errormessage='';
        res.render("passwords/resetform", {
            pageTitle: 'Reset-Password',
            url: req.url,
            userId: user._id,
            token:req.params.token,
            errorMessage: message || null,
            AuthenticUser: req.session.isLogin || false
        })




    } catch (error) {
        console.log(error)
    }



}

exports.setNewPassword=async(req,res,next)=>{
    try {
        if (!(req.body.password === req.body.confirm_password)) {
            req.session.errormessage = "Password Not match";
            return res.redirect(`/reset-password-form/${req.body.token}`);
        }
    const encryptedPassword = await bcrypt.hash(req.body.password, 6)
        const user = await userModel.user.findOne({ _id: req.body.userId })
        user.token = null
        user.tokenExpiry = null,
            user.password = encryptedPassword

        await user.save()
res.redirect('/login');
    } catch (error) {
        console.log(error)
    }
   
    

}