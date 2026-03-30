const productArray=require("../controllers/cadmin.js");
const modelProduct=require("../models/product.js");
exports.fetchProduct=(req,res,next)=>{
 modelProduct.fetchAll().then(([product,metadata])=>{
    res.render("user/product-list",{
        productArray:product,
         pageTitle:"ALL-Products",
      url:req.url
    })
 }).catch((err)=>{
    console.log(err)
 })
}
exports.fetchSaleProducts=(req,res,next)=>{
 modelProduct.fetchAll().then(([product,metadata])=>{
     res.render("user/index",{
        productArray:product,
         pageTitle:"Sale",
      url:req.url
    })
 }).catch((err)=>{
    console.log(err);
 })
}


exports.orders=(req,res,next)=>{
    res.render("user/orders",{
        pageTitle:"Your Orders",
        url:req.url
    })
}
exports.checkout=(req,res,next)=>{
    res.render("user/checkout",{
        pageTitle:"Checkout",
        url:req.url
    })
}
exports.details=(req,res,next)=>{
   
    modelProduct.findproduct(req.params.productId).then(([product])=>{
         res.render("user/product-detail",{
            pageTitle:product.title,
            url:"",
            productArray:product
        })
    }).catch((err)=>{
        console.log(err);
    })


}
// const getShop= (req, res, next) => {
//   console.log(productArray.product);
//   res.render("shop",
//     {
//       productArray:productArray.product,
//       pageTitle:"My Shop",
//       url:"/"
//     }
//   );
// }
