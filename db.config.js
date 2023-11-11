// import des modules
const { Sequelize } = require("sequelize")

// Connexion à la base
let sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false
    }
)


const db = {}

db.sequelize = sequelize
db.Formation = require("./models/formation")(sequelize)
db.Formateur = require("./models/formateur")(sequelize)
db.Eleve = require("./models/eleve")(sequelize)
db.Module = require("./models/module")(sequelize)
db.Note = require("./models/note")(sequelize)

db.Formation.hasMany(db.Eleve, { foreignKey: "id_formation" })
db.Eleve.belongsTo(db.Formation, { foreignKey: "id_formation" })

// Synchro des modèles
db.sequelize.sync({ alter: true })


module.exports = db