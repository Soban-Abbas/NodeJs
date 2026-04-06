
const dbConfig = require("../util/dbConfig");
const mongodb=require("mongodb");
let getdb = dbConfig.getdb;
class user {

    constructor(name, email) {
        this.name = name,
            this.email = email
    }

    static save() {
        let db = getdb();

        return db.collection("users").insertOne(this);
    }

    static findUser(userid){
let db=getdb();


return db.collection("users").findOne({_id:new mongodb.ObjectId(userid)})

    }


}

module.exports=user;