
const modelProduct= require("../models/product")
const admingetProduct= (req, res, next) => {
  res.render("admin/edit-product",{
    url:"/admin"+req.url,
    pageTitle:"admin-page",
    edit : false,
    product:false
  });
}

const adminPostProduct= (req, res, next) => {
  
  const newProduct=new modelProduct(req.body.title,req.body.price,req.body.image,req.body.discription);
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
const productEdit=(req,res,next)=>{
let edit=req.query.edit;
if(edit==="true"){

  let id=req.params.productID;
  console.log(id);
console.log(edit)
  modelProduct.findproduct(id,(prod)=>{
  res.render("admin/edit-product",{
    pageTitle:"Edit Product",
    url:"/edit-product",
    edit:true,
    product:prod
  })
  })

}else{
  res.redirect("/")
}
}
module.exports={
    adminGet:admingetProduct,
    adminPost:adminPostProduct,
    adminProductList:productList,
    editProduct:productEdit
    
}