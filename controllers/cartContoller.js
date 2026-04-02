const cartModel = require("../models/cart")
const productModel = require("../models/product")
const usermodel = require("../models/user")
// exports.cart=(req,res,next)=>{

//     res.render("user/cart",{
//         pageTitle:"Cart",
//         url:"/cart"
//     })


// }
exports.addToCart = async (req, res, next) => {
    //     productModel.findproduct(req.params.productID,(product)=>{
    // cartModel.addProductToCart(product.id,product.price);
    //           res.redirect("/cart")
    //     })

    try {
        let product = await productModel.findByPk(req.params.productID);
        let cart = await req.user.getCart();
        if (!cart) {
            console.log("no cart")
            cart = await req.user.createCart();
        }

        let cartProduct = await cart.getProducts({
            where: {
                id: req.params.productID,
            }
        })

        console.log(cartProduct)


        let existingProdut;

        if (cartProduct.length > 0) {
            existingProdut = cartProduct[0];
        }
        let quantity = 1;
        if (existingProdut) {
            console.log(existingProdut);
            const oldQty = existingProdut.CartItems.quantity;
            let newqty = oldQty + 1;
            await existingProdut.CartItems.update({ quantity: newqty })
            res.redirect("/cart");
        } else {
            await cart.addProduct(product, {
                through: {
                    quantity: quantity
                }
            })

            res.redirect("/cart");

        }

    } catch (error) {
        console.log(error);
    }


}


exports.cart = async (req, res, next) => {

    try {
        let cart = await req.user.getCart();
        let product = await cart.getProducts();
        res.render("user/cart", {
            productArray: product,
            pageTitle: "Cart",
            url: "/cart",
            grandTotal: 1000
        })


    } catch (error) {
        console.log(error)
    }




    // req.user.getCart().then((cart)=>{
    //     console.log(cart)

    // }).catch((err)=>{
    //     console.log(err);
    // })


    // cartModel.getDetailedProducts((products,total)=>{

    // })
}


exports.deleteCartProduct = async(req, res, next) => {
    console.log(req.body.productID);
   // cartModel.deleteCartProduct(req.body.productID, (cartItem, total) => {

let cart= await req.user.getCart()
let deleteProduct=await cart.removeProducts(req.body.productID);



        res.redirect("/cart")
   // })
}

