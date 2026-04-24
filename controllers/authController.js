const userModel = require("../models/user")


exports.getLogin = (req, res, next) => {

    let message = req.session.errormessage;
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

        let userexist = await userModel.user.findOne({ email: req.body.email })
        if (!userexist || userexist.password!==req.body.password) {
            req.session.errormessage = "Wrong Email or Password";
            return res.redirect('/login')
        }
    
            req.session.userId=userexist._id;
            req.session.isLogin=true
            res.redirect('/')
        

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
    })
}

exports.postSignup = async (req, res, next) => {
    try {
        if (req.body.password !== req.body.confirm_password) {
            req.session.errormessage = "password mismatch";
            return res.redirect('/signup');
        }
        let email = req.body.email;

        const existEmail = await userModel.user.findOne({ email });
        if (existEmail) {
            req.session.errormessage = "Email Alredy Registered";
            return res.redirect('/signup')
        }

        const newUser = new userModel.user({
            email: req.body.email,
            password: req.body.password,
            cart: { items: [] }
        })

        await newUser.save()
        console.log('user register')
        res.redirect('/login')


    } catch (error) {
        console.log(error)
    }

}