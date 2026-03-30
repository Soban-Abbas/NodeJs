

const db = require("../util/dbConfig")


module.exports = class product {
    constructor(id, title, price, img, dis) {
        this.id = id;
        this.title = title;
        this.price = price
        this.image = img;
        this.discription = dis;

    }

    save() {

        return db.pool.execute('insert into products(title,price,discription,image) values(?,?,?,?)',[this.title, this.price, this.discription, this.image] ) 




    }


    static fetchAll() {
        return db.pool.execute('select * from products')
    }


    static findproduct(id) {

    return db.pool.execute('select * from products where id=?',[id]);

    };


    static deleteProduct(id) {

    }


}
