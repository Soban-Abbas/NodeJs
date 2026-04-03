//const { use } = require("react");
const product=require("../models/product");
const order = require("../routes/order");
exports.postOrder= async(req,res,next)=>{
   // console.log(req.url);
try {
      let cart=await req.user.getCart();
let product=await cart.getProducts();

let userOrder=await req.user.createOrder();
await userOrder.addProducts(
    product.map(p=>{
        p.OrderItems={
            quantity:p.CartItems.quantity,
        }
        return p;
    })
)

await cart.setProducts(null);


    res.render("user/orders",{
        pageTitle:"Your Orders",
        url:req.url
    })
} catch (error) {
    console.log(error)
}



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
