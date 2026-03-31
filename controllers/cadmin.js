
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
req.user.createProduct({
    title:req.body.title,
    price:req.body.price,
    discription:req.body.discription,
    image:req.body.image
  }).then((result)=>{
console.log("product Added")
res.redirect("/admin/product-list")
  }).then((err)=>{
    console.log(err);
  })
}
const productList = (req, res, next) => {
  modelProduct.findAll().then((product)=>{
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
    
    modelProduct.findByPk(id).then((prod)=>{
       res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        url: "/edit-product",
        edit: true,
        product: prod
      })
    }).catch((err)=>{
      console.log(err)
    })

  } else {
    res.redirect("/")
  }
}
const postEditProduct=(req,res,next)=>{
  

 

modelProduct.findByPk(req.body.productID).then((product)=>{
  product.title=req.body.title,
  product.price=req.body.price,
  product.image=req.body.image,
  product.discription=req.body.discription

 return product.save();
})
.then(()=>{
  res.redirect("/admin/product-list")
})
.catch((err)=>{
  console.log(err)
})
}
//_____better aproach to update_______
// modelProduct.update(
//   {
//     title: req.body.title,
//     price: req.body.price,
//     image: req.body.image,
//     discription: req.body.discription
//   },
//   {
//     where: { id: req.body.productID }
//   }
// )
// .then(() => {
//   res.redirect("/admin/product-list");
// })
// .catch(err => console.log(err));

const deleteProduct=(req,res,next)=>{
  
modelProduct.destroy({where:{
  id:req.body.productID
}}).then(()=>{
  res.redirect("/admin/product-list");
}).catch((err)=>{
  console.log(err)
})
}
module.exports = {
  adminGet: admingetProduct,
  adminPost: adminPostProduct,
  adminProductList: productList,
  editProduct: productEdit,
  postEditProduct: postEditProduct,
  deleteProduct:deleteProduct
}