
const modelProduct = require("../models/product")
const admingetProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    url: "/admin" + req.url,
    pageTitle: "admin-page",
    edit: false,
    product: false
  });
}

const adminPostProduct = (req, res, next) => {

  console.log(req.body);
  const newProduct = new modelProduct(req.body.productID,req.body.title, req.body.price, req.body.image, req.body.discription);
  newProduct.save().then(()=>{
    res.redirect('/');
  }).catch((err)=>{
    console.log(err);
  })
  
}
const productList = (req, res, next) => {
  modelProduct.fetchAll().then(([product])=>{
     res.render("admin/products", {
      pageTitle: "Admin-Products",
      url: "/admin" + req.url,
      productArray: product
    })
  }).catch((err)=>{
    console.log(err)
  })
}
const productEdit = (req, res, next) => {
  let edit = req.query.edit;
  if (edit === "true") {

    let id = req.params.productID;
    
    modelProduct.findproduct(id, (prod) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        url: "/edit-product",
        edit: true,
        product: prod
      })
    })

  } else {
    res.redirect("/")
  }
}
const postEditProduct=(req,res,next)=>{
  

  const updateProduct=new modelProduct(req.body.productID,req.body.title,req.body.price,req.body.image,req.body.discription)
updateProduct.save().then(()=>{
res.redirect("/admin/product-list")
}).catch((err)=>{
console.log(err);
})

}


const deleteProduct=(req,res,next)=>{
  
modelProduct.deleteProduct(req.body.productID);
res.redirect("/admin/product-list");

}
module.exports = {
  adminGet: admingetProduct,
  adminPost: adminPostProduct,
  adminProductList: productList,
  editProduct: productEdit,
  postEditProduct: postEditProduct,
  deleteProduct:deleteProduct
}