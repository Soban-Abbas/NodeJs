const cartModel= require("../models/cart")
const productModel=require("../models/product")
// exports.cart=(req,res,next)=>{

//     res.render("user/cart",{
//         pageTitle:"Cart",
//         url:"/cart"
//     })


// }
exports.addToCart=(req,res,next)=>{
    productModel.findproduct(req.params.productID,(product)=>{
cartModel.addProductToCart(product.id,product.price);
          res.redirect("/cart")
    })
        
    }


  exports.cart=(req,res,next)=>{

cartModel.getDetailedProducts((products,total)=>{
    res.render("user/cart",{
        productArray:products,
        pageTitle:"Cart",
        url:"/cart",
        grandTotal:total
    })
})
 }


 exports.deleteCartProduct=(req,res,next)=>{
    console.log(req.body.productID);
    cartModel.deleteCartProduct(req.body.productID,(cartItem,total)=>{
     res.redirect("/cart")
    })
 }

