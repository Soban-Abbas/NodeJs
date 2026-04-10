//const { use } = require("react");
const product=require("../models/product");
const order = require("../routes/order");
exports.postOrder= async(req,res,next)=>{
   // console.log(req.url);
req.user.postOrder().then(()=>{
    console.log("order place")
})


}
exports.getOrder=async(req,res,next)=>{
    try {
        let orders= await req.user.getOrders({
    include:product
})

// for (let order of orders) {
//   console.log("Order ID:", order.id);

//   for (let product of order.Products) {   // Products is an array
//     console.log("Product:", product.title);
//     console.log("Quantity:", product.OrderItems.quantity); // junction table data
//   }
// }
//console.log(orders[0].OrderItem.quantity)
res.render("user/orders",{
         pageTitle:"Your Orders",
         url:req.url,
         orders:orders
    })



    } catch (error) {
        console.log(error)
    }

//    
}
