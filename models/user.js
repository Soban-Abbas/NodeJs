const sequelize = require("../util/dbConfig");
const Sequelize = require("sequelize")
const user = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    Email: {
        type: Sequelize.STRING,

    }
})

module.exports=user