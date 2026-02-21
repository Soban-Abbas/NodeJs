const express = require("express");
const app = express();
app.use(express.json());
let port = 3000;



const products = [
  { id: 1, name: "Wireless Mouse", price: 25.99 },
  { id: 2, name: "Mechanical Keyboard", price: 89.99 },
  { id: 3, name: "Gaming Monitor", price: 299.50 },
  { id: 4, name: "USB-C Hub", price: 45.00 },
  { id: 5, name: "Noise Cancelling Headphones", price: 199.99 },
  { id: 6, name: "Webcam 1080p", price: 59.95 },
  { id: 7, name: "External SSD 1TB", price: 120.00 },
  { id: 8, name: "Laptop Stand", price: 34.99 },
  { id: 9, name: "Desk Mat", price: 15.00 },
  { id: 10, name: "Bluetooth Speaker", price: 75.25 }
];

const loggerMiddlewere=(req,res,next)=>{

// console.log(req.param);
// console.log(req.method);
// console.log(req.url);
// req.currentTime=new Date();
// console.log(req.currentTime);
next();

}
app.use(loggerMiddlewere)

app.get("/", (req,res)=>{
    if(products.length===0){
        return next({
            status:404,
            message:"Product not found"
        })
    }
    res.status(200).json({
        products
    });
    
})

app.put("/updateProduct/:id",(req,res,next)=>{

  let id=  Number(req.params.id);
  if(!Number.isInteger(id) || id<=0){
    return next({
        status:404,
        message:"Invalid ID"

    })
  }

  let updateIndex=products.findIndex(p=>p.id===id)
  let{name:name,price:price}=req.body;
  if(!name || !price){
    return next({
        status:404,
        message:"Invalid product name or price"
    })
  }

  products[updateIndex]={
    id:id,
    ...req.body
  }
  console.log(products);
  res.status(200).json({
    status:"Successfull",
    message:"product updated successfuly"
  })



})
    



app.get("/product/:id",(req,res,next)=>{
    let id=parseInt(req.params.id);
    let product=products.indexOf(p=>p.id===id);
    if(product===-1){
        return next({
            status:404,
            message:"Product not found in DB"
        })
    }
    res.status(500).json(
        products[product]
    )
    
})

app.post("/product",(req,res,next)=>{
    let productInfo=req.body;
    const{name:name,price:price}=req.body;
    console.log(typeof name , typeof price, price);
    if(typeof name==="string"  && typeof price==="number" && price>0){
        productInfo={
id:products[products.length-1].id+1,
name:name,
price:price
        }
        products.push(productInfo);
        console.log(products);
        res.status(201).json({
            status:201,
            message:"Product added successfully",
            ...products
        })

    }

    return next({
        status:400,
        message:"Invalid data"
    })


})


app.delete("/product/:id",(req,res,next)=>{
  let deleteProduct=Number(req.params.id);
  if(!Number.isInteger(deleteProduct) || deleteProduct<=0){
    return next({
        status:404,
        message:"Product id not found"
    })
  }

  let deleteIndex=products.findIndex(p=>p.id===deleteProduct);
  let tempProduct={...products[deleteIndex]}
  if(deleteIndex===-1){
    return next({
        status:404,
        message:"Prduct id not found"
    })
  }
  products.splice(deleteIndex,1);
  console.log(products);
  res.status(200).json({
    status:200,
    message:"Product deleted successfullly",
    deletedProduct:tempProduct
  })
})


app.use((err,req,res,next)=>{
const status=err.status || 500;
const message=err.message || "Internal server error";
res.status(status).json({
    error:message
})
})





















app.listen(port, () => {
    console.log(`running server at port${port} `)
});

