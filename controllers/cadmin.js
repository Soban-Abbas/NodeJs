
//const modelProduct = require("../models/product")
//const dbconfigfile = require("../util/dbConfig");
const productModel = require("../models/product")

const admingetProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    url: "/admin" + req.url,
    pageTitle: "admin-page",
    edit: false,
    product: false,
    AuthenticUser: req.session.isLogin
  });
}

const adminPostProduct = (req, res, next) => {

  const p = new productModel.product({
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    discription: req.body.discription,
    userId: req.user,

  })
  p.save().then((result) => {
    res.redirect("/admin/product-list")
  }).catch((err) => {
    console.log(err)

  })

  // .then((result)=>{
  // console.log("product Added")
  // 
  //   }).then((err)=>{
  //     console.log(err);
  //   })
}
const productList = (req, res, next) => {


  
  let editError = req.query.error || false;
  req.query.error = null;
  productModel.product.find({}).then((product) => {
    res.render("admin/products", {
      pageTitle: "Admin-Products",
      url: "/admin" + req.url,
      productArray: product,
      AuthenticUser: req.session.isLogin,
      errorMessage: editError || false,
      userId:req.user._id
    })
  }).catch((err) => {
    console.log(err)
  })
}


const productEdit = (req, res, next) => {
  let edit = req.query.edit;
  if (edit === "true") {

    let _id = req.params.productID;

    productModel.product.findOne({ _id: _id, userId: req.user._id }).exec().then((product) => {

      if (!product) {
        return res.redirect("/admin/product-list?error=notallowed")
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        url: "/admin/add-product",
        edit: true,
        product: product,
        AuthenticUser: req.session.isLogin
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
  const _id = req.body.productID;
  productModel.product.updateOne(
    { _id, userId: req.user._id },
    {
      title: req.body.title,
      price: req.body.price,
      image: req.body.image,
      discription: req.body.discription
    }).then((result) => {
      // console.log("updated Successfully")

      console.log(result)
      if (result.matchedCount === 0 || result.matchedCount) {
        return res.redirect("/admin/product-list?error=notallowed")
      }
      res.redirect("/admin/product-list")
    }).catch((err) => {
      console.log(err);
    });

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
  let _id = req.body.productID;
  productModel.product.deleteOne({ _id: _id, userId: req.user._id }).then((result) => {
    if (result.deletedCount === 0) {
      return res.redirect("/admin/product-list?error=notallowed")
    }
    res.redirect('/admin/product-list');
  }).catch((err) => {
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