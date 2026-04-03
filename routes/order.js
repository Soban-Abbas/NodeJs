const express=require("express");
//onst { route } = require("./admin");
const orderControllers=require("../controllers/order.js")

const route=express.Router();


route.post("/post-order",orderControllers.postOrder);

route.get("/post-order", orderControllers.getOrder);
module.exports={
    order:route
}