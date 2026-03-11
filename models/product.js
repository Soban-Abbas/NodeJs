const fs = require("fs");
const path = require("path")
const rootPath = require("../util/rootPath");
const filePath = path.join(rootPath, "data", "Dbfile.json")


const readFileContent = (cb) => {
    fs.readFile(filePath, (err, filedata) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(filedata))
        }
    })
}
module.exports = class product {
    constructor(title) {
        this.title = title;
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
}