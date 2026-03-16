const fs = require("fs");
const path = require("path")
const rootPath = require("../util/rootPath");
const filePath = path.join(rootPath, "data", "Dbfile.json")
//const cartModel=require("../models/cart");
const cartfile=path.join(rootPath,'data','cart.json')


const readCartFile=(cb)=>{
      fs.readFile(cartfile,(err,cartData)=>{
                if(err || !cartData||cartData.length===0){
                    cb({products:[],Total:0})
                }else{
                    cb(JSON.parse(cartData.toString()))
                }
             })

}
   
const readFileContent = (cb) => {
    fs.readFile(filePath, (err, filedata) => {
        if (err || !filedata.length) {
            cb([])
        } else {
            cb(JSON.parse(filedata.toString()))
        }
    })
}
module.exports = class product {
    constructor(id, title, price, img, dis) {
        this.id = id;
        this.title = title;
        this.price = price
        this.image = img;
        this.discription = dis;
        
    }

    save() {


        if (this.id === '') {
          this.id = (Math.random() * 100).toFixed(4)

            readFileContent((product) => {
                product.push(this)
                fs.writeFile(filePath, JSON.stringify(product), (err) => {
                    console.log(err);
                })
            })
        }
        else {

            readFileContent((product) => {
                const existingProductIndex = product.findIndex(p => p.id === this.id);
                //product ik array ha os ma objs hin
                //array ma ham push kr skte hin 
                //agr kisi speciic index ma change krna hu
                // array[8]=newitem so
                //hamin index mil gya jider hamra product exit krnt ha 
                //bus os index ko updated product sy update kr du
                product[existingProductIndex] = this
                fs.writeFile(filePath, JSON.stringify(product), (err) => {
                
                    
                })
            })

        }



    }


    static fetchAll(cb) {
        readFileContent(cb);
    }


    static findproduct(id, cb) {

        readFileContent((product) => {
            const pro = product.find(p => p.id === id)
            cb(pro);
        });


    };

   
    static deleteProduct(id){
        readFileContent((product)=>{
             const deleteProductIndex=product.findIndex(p=>p.id===id);
              readCartFile((cart)=>{
                
                const deleteFromCartIndex=cart.products.findIndex(p=>p.id===id);
                if(deleteFromCartIndex>=0){
                    cart.products.splice(deleteFromCartIndex,1);
                    cart.Total=cart.products.reduce((acc,curr)=>{
                        return acc+curr.price;
                    },0)
                    fs.writeFile(cartfile,JSON.stringify(cart),(err)=>{
                        console.log(err);
                    })
                }

              })
             product.splice(deleteProductIndex,1);
    
             fs.writeFile(filePath,JSON.stringify(product),(err)=>{
                console.log(err);
             })
        })
    }


}
