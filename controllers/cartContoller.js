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

cartModel.fetchAllProduct((cart)=>{
    productModel.fetchAll((product)=>{
            let detailProductData=cart.products.map((cartItem)=>{
                const matchProduct=product.find(p=>p.id===cartItem.id);

                return{
                    id:cartItem.id,
                    title:matchProduct.title,
                    image:matchProduct.image,
                    Qty:cartItem.Qty,
                    price:matchProduct.price,
                    TotalPrice:cartItem.price,
                }
            })

          res.render("user/cart",{
              productArray:detailProductData,
              pageTitle:"Cart",
              url:"/cart",
              grandTotal:cart.Total,
          })



    })
   })

  }

 




