const productArray=require("../controllers/cadmin.js");
const modelProduct=require("../models/product.js");
exports.fetchProduct=(req,res,next)=>{
 modelProduct.fetchAll((product)=>{
    res.render("shop",{
        productArray:product,
         pageTitle:"My Shop",
      url:"/"
    })
})}


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
