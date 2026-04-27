const express=require("express");
const router=express.Router();
const { body } = require("express-validator");
const authController=require("../controllers/authController");

const userModel=require("../models/user")


router.get('/login',authController.getLogin);
router.post('/login',authController.postLogin);
router.post('/logout',authController.postLogout);
router.get('/signup',authController.getSignup);
router.post('/signup', body('email').isEmail().trim().normalizeEmail().withMessage("Must b Valid Email").bail().custom(async(value)=>{
const user=await userModel.user.findOne({email:value})
if(user){
    console.log("user with this mail already register")
    throw new Error("User Alredy Exist With this Email")
}
return true
}),
    body('password').isLength({ min: 5,max:20 }).withMessage("Must be between 4 to 20 characters"),
    body('confirm_password').isLength({ min: 5, max: 20 }).withMessage("Password Must be between 4 to 20 characters").bail().custom((value,{req})=>{
        if(value!==req.body.password){
            console.log("conform Password Not match");
            throw new Error("Confirm Password Not match")
        }
        return true
    })
    ,authController.postSignup);
module.exports=router;