
const modelProduct = require("../models/product")
const dbconfigfile = require("../util/dbConfig");


const admingetProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    url: "/admin" + req.url,
    pageTitle: "admin-page",
    edit: false,
    product: false
  });
}

const adminPostProduct = (req, res, next) => {
  const product = new modelProduct(req.body.productID,
    req.body.title,
    req.body.price,
    req.body.image,
    req.body.discription)
  product.save(() => {
    res.redirect("/admin/product-list")
  })
  // .then((result)=>{
  // console.log("product Added")
  // 
  //   }).then((err)=>{
  //     console.log(err);
  //   })
}
const productList = (req, res, next) => {

  modelProduct.getProducts((product) => {
    res.render("admin/products", {
      pageTitle: "Admin-Products",
      url: "/admin" + req.url,
      productArray: product
    })
  })
}
const productEdit = (req, res, next) => {
  let edit = req.query.edit;
  if (edit === "true") {

    let id = req.params.productID;

    modelProduct.findOneProduct(id).then((product) => {
    //  console.log(product);
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        url: "/admin/add-product",
        edit: true,
        product: product
      })



    }).catch((err) => {
      console.log(err);
    })
    //  


  } else {
    res.redirect("/")
  }
}
const postEditProduct = (req, res, next) => {

  modelProduct.update(req.body.productID, req.body.title, req.body.price, req.body.image, req.body.discription).then((updatedProduct) => {
    res.redirect("/admin/product-list")
  }).catch((err) => {
    console.log(err);
  })
  // product.save(() => {
  //  
  // })
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

const deleteProduct = (req, res, next) => {

modelProduct.deleteProduct(req.body.productID).then(()=>{
  res.redirect('/admin/product-list');
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
  deleteProduct: deleteProduct
}