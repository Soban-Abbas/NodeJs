const modelProduct=require("../models/product")
const admingetProduct= (req, res, next) => {
  res.render("admin/add-product",{
    url:"/admin"+req.url,
    pageTitle:"admin-page"
  });
}

const adminPostProduct= (req, res, next) => {
  
  const newProduct=new modelProduct(req.body.title);
  newProduct.save();
  res.redirect('/');
}
const productList=(req,res,next)=>{
  modelProduct.fetchAll((product)=>{
    res.render("admin/products",{
      pageTitle:"Admin-Products",
      url:"/admin"+req.url,
      productArray:product
    })
  })
}
const editProduct=(req,res,next)=>{

}
module.exports={
    adminGet:admingetProduct,
    adminPost:adminPostProduct,
    adminProductList:productList,
    adminEditProduct:editProduct
    
}