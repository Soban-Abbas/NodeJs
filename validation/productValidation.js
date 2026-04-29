const {check}=require("express-validator");

exports.validateProduct=[
    check('title').notEmpty().withMessage("Title is Required").bail().trim().isLength({ min: 3, max: 100 }).withMessage("title must b in 3-100 characters"),
    check('price').notEmpty().withMessage("Price  is Required").bail().trim().isFloat({min:0}).withMessage('Price should be greater then  0'),
    check('image').notEmpty().withMessage("Title is Required").bail().isString().withMessage("Invalid Image Url"),
    check('discription').notEmpty().withMessage("Title is Required").bail().isLength({min:10,max:1000}).withMessage("Discription length not Valid")
]