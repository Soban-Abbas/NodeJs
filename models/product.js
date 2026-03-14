const fs = require("fs");
const path = require("path")
const rootPath = require("../util/rootPath");
const filePath = path.join(rootPath, "data", "Dbfile.json")


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
    constructor(title, price, img, dis) {
        this.title = title;
        this.price = price
        this.image = img;
        this.discription = dis;
        this.id = (Math.random() * 100).toFixed(4);
    }

    save() {

        readFileContent((product) => {
            product.push(this)
            fs.writeFile(filePath, JSON.stringify(product), (err) => {
                console.log(err);
            })
        })
    }


    static fetchAll(cb) {
        readFileContent(cb);
    }


    static findproduct(id, cb) {

        readFileContent((product) => {
            const pro = product.find(p => p.id===id)
              cb(pro);
            } );
        
          
        };




    }
