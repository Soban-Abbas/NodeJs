//const { use } = require("react");
const user=require("../models/user")
exports.postOrder= (req,res,next)=>{
   // console.log(req.url);
req.user.postOrder().then(()=>{
 

    res.redirect("/post-order")
}).catch((err)=>{
    console.log(err)
})


}
exports.getOrder=(req,res,next)=>{
console.log(req.user);
  req.user.getOrders().then((orders)=>{
    console.log(orders)
    res.render("user/orders",{
        pageTitle:"orders",
        url:req.url,
        orders:orders

    })
  }).catch((err)=>{
    console.log(err)
  })
}
