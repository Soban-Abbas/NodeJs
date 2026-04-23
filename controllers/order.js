//const { use } = require("react");
const user = require("../models/user")
const order = require("../models/orderItems")
exports.postOrder = (req, res, next) => {
  req.user.populate('cart.items.productId').then((result) => {

    let storeInOrderProducts = result.cart.items.map(item => {

      return {
        product: {
          title: item.productId.title,
          price: item.productId.price,
          quantity: item.quantity
        }

      }
    })

    let grandTotalOfAllProducts = storeInOrderProducts.reduce((acc, curr) => {
      curr = Number(curr.product.price * curr.product.quantity)
      return acc + curr;
    }, 0)

    const userorder = new order({
      user_id: req.user._id,
      items: storeInOrderProducts,
      grandTotal: grandTotalOfAllProducts
    })

    userorder.save().then((result) => {
      console.log("order save in database")
      req.user.cart.items = [],
        req.user.save()
      res.redirect('/post-order')
    })

  }).catch((err) => {
    console.log(err)
  })


}
exports.getOrder = (req, res, next) => {

  if (!req.user) {
    res.redirect("404")
  }
  console.log(req.user);
    
  let user_id =req.user._id;
  order.find({ user_id }).then((orders)=>{
//console.log(orders)
    res.render("user/orders", {
      pageTitle: "orders",
      url: req.url,
      orders: orders,
      AuthenticUser: req.session.isvalid

    })
  })
  

  .catch((err) => {
    console.log(err)
  })

}