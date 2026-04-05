const mongodb = require("mongodb");
let db;
const connectToDb = (Callback) => {

    const url = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.jvimlwf.mongodb.net/${process.env.database}`;
    mongodb.MongoClient.connect(url).then((client) => {
        console.log("database connected successfully")
        db = client.db();
        Callback();
    }).catch((err) => {
        console.log(err)
    })
}
const getdb = () => {
    if (db) {
        return db;
    } else {
        throw "db is not connected";
    }
}
module.exports ={
    connectToDb:connectToDb,
    getdb:getdb
}