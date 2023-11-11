// Import des modules
const { DataTypes } = require("sequelize")
//const DB = require("../db.config")
//const sequelize = require("../db.config")

// Définition du modèle formation
module.exports = (DB) => {
    const Module = DB.define("Module", {
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
        id_formation: {
            type: DataTypes.INTEGER(10),
            defaultValue: 0,
            allowNull: false
        },
        id_formateur: {
            type: DataTypes.INTEGER(10),
            defaultValue: 0,
            allowNull: false
        }
    })
    return Module
}