// Import des modules
const express = require("express")
//const Formateur = require("../models/formateur")

const ctrlFormateur = require("../controllers/c_formateur")

// Récupération du Router d'express
let router = express.Router()

/** Middleware time */
router.use((req, res, next) => {
    const event = new Date()
    console.log("Formateur time : ", event.toString())
    next()
})


// Routage de la ressource Formateur
router.get("", ctrlFormateur.getAllFormateurs)

router.get("/:id", ctrlFormateur.getFormateur)

router.put("", ctrlFormateur.addFormateur)

router.patch("/:id", ctrlFormateur.changeFormateur)

router.delete("/:id", ctrlFormateur.deleteFormateur)

module.exports = router