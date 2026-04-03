const  Sequelize  = require("sequelize");

const sequelize=require("../util/dbConfig");

const order=sequelize.define('Order',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
})

module.exports=order