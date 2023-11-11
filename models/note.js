// Import des modules
const { DataTypes } = require("sequelize")
//const DB = require("../db.config")
//const sequelize = require("../db.config")

// Définition du modèle formation
module.exports = (DB) => {
    const Note = DB.define("Note", {
        id_formation: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        id_eleve: {
            type: DataTypes.INTEGER(10),
            defaultValue: 0,
            allowNull: false
        },
        valeur: {
            type: DataTypes.INTEGER(2),
            defaultValue: 0,
            allowNull: false
        },
        commentaire: {
            type: DataTypes.STRING(250),
            defaultValue: '',
            allowNull: true
        },
        id_module: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        }
    })
    return Note
}