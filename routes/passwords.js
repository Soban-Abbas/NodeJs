const express=require("express")
const route=express.Router()
const passwordContoller=require("../controllers/passwordController")
route.get("/reset-password",passwordContoller.getResetPassword)
route.post('/post-reset-Email',passwordContoller.postResetEmail)
route.get('/reset-password-form/:token',passwordContoller.getResetForm)
route.post("/new-password",passwordContoller.setNewPassword)
module.exports=route;