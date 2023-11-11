// Import des modules
const { DataTypes } = require("sequelize")
//const DB = require("../db.config")
//const sequelize = require("../db.config")

// Définition du modèle formation
module.exports = (DB) => {
    const Formateur = DB.define("Formateur", {
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
        prenom: {
            type: DataTypes.STRING(50),
            defaultValue: '',
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            validate: {
                isEmail: true
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i,
            allowNull: false
        }
    })
    return Formateur
}