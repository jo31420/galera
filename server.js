// Import des modules
const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose");
//const dotenv = require("dotenv").config({ encoding: "latin1" });


// Import de la connexion à la DataBase
let DB = require("./db.config")

// Initialisation de l'API
const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Routers */
const formation_router = require("./routes/formations")
const formateur_router = require("./routes/formateurs")
const eleve_router = require("./routes/eleves")
const module_router = require("./routes/modules")
const note_router = require("./routes/notes")

// Routage
app.get("/", (req, res) => res.send("Coucou les amis, I am online"))

app.use("/formations", formation_router)
app.use("/formateurs", formateur_router)
app.use("/eleves", eleve_router)
app.use("/modules", module_router)
app.use("/notes", note_router)

app.all("*", (req, res) => res.status(501).send("Que fais tu ?"))



// Démarrage serveur avec test DB

/* Connection BDD mongoose */
mongoose
    .connect(process.env.MONGO_DB)
    // Demarrage serveur
    .then(() => {
        console.log("MONGODB OK !")
        DB.sequelize.authenticate()
            .then(() => console.log("Database connection OK !"))
            .then(() => {
                app.listen(process.env.SERVER_PORT, () => {
                    console.log(`Serveur en ligne sur le port ${process.env.SERVER_PORT} `)
                })
            })
            .catch(err => console.log("Database error", err))
    })
    // Arret du serveur si connection impossible
    .catch(() => console.log("Erreur MONGODB!"));

