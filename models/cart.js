const fs = require("fs");
const path = require("path");
const rootPath = require("../util/rootPath");
const cartfile = path.join(rootPath, "data", "cart.json");


class Cart{
    static addProductToCart(id,price){

        fs.readFile(cartfile,(err,fileData)=>{
              let cart={products:[],Total:0}
            if(err || fileData.length===0 || !fileData){
              
                const productObj={
                    id:id,
                    Qty:1,
                    price:Number(price),
                }
                cart.products.push(productObj);
                const totalBill=cart.products.reduce((acc,curr)=>{
                    curr=Number(curr.price)
                    return acc+curr
                },0)
                   
                cart.Total=totalBill;
                fs.writeFile(cartfile,JSON.stringify(cart),(err)=>{
                    console.log(err);
                })
            }else{
                cart=JSON.parse(fileData);
                //ik cheez tu clear ha file exit krte ha 
                //or ab ya check krna ha kay jo product aye hin addtocart ma wo pyle exit tu nahi krte cart(file)ma 
                //ager yes quantity increse by 1 and price double
                //ager nahi tu naya obj bana kr add kro product ma
                //phr all product ki price total ma add kr du
            let existingProductIndex=cart.products.findIndex(p=>p.id===id); //return index or -1
            let existingProduct=cart.products[existingProductIndex];//hamre pass exisitng prodct ay gya ya undefinded   
            
if(existingProduct){
    existingProduct.Qty=existingProduct.Qty+1;
    existingProduct.price=existingProduct.price+Number(price);
}else{
    const newProduct={
        id:id,
        Qty:1,
        price:Number(price),
    }
    cart.products.push(newProduct);
}

let total=cart.products.reduce((acc,curr)=>{
    curr=Number(curr.price);
    return acc+curr;
},0)
cart.Total=total
fs.writeFile(cartfile,JSON.stringify(cart),(err)=>{
    console.log(err);
})
            }
        })


}
}
module.exports=Cart