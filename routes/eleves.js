// Import des modules
const express = require("express")
//const Eleve = require("../models/eleve")

const ctrlEleve = require("../controllers/c_eleve")

// Récupération du Router d'express
let router = express.Router()

/** Middleware time */
router.use((req, res, next) => {
    const event = new Date()
    console.log("Eleve time : ", event.toString())
    next()
})


// Routage de la ressource Eleve
router.get("", ctrlEleve.getAllEleves)

router.get("/:id", ctrlEleve.getEleve)

router.put("", ctrlEleve.addEleve)

router.patch("/:id", ctrlEleve.changeEleve)

router.delete("/:id", ctrlEleve.deleteEleve)

module.exports = router