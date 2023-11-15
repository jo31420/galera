// Import des modules
const { DataTypes } = require("sequelize")
//const DB = require("../db.config")
//const sequelize = require("../db.config")

// Définition du modèle formation
module.exports = (sequelize) => {
    const Formation = sequelize.define("Formation", {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING(50),
            defaultValue: '',
            allowNull: false
        },
        debut: {
            type: DataTypes.INTEGER(10),
            defaultValue: 0,
            allowNull: false
        },
        fin: {
            type: DataTypes.INTEGER(10),
            defaultValue: 0,
            allowNull: false
        }
    })
    return Formation
}