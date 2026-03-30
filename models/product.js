const sequelize=require("../util/dbConfig");
const Sequelize=require("sequelize");

const product=sequelize.define('product',{
id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey:true
},
title:Sequelize.STRING,
price:{
    type:Sequelize.DOUBLE,
    allowNull:false
},
discription:{
    type:Sequelize.TEXT,
    allowNull:false
},
image:{
    type:Sequelize.TEXT,
    allowNull:false,
}
})

module.exports=product;