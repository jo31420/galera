// Import des modules
const express = require("express")
//const Formation = require("../models/formation")

const ctrlFormation = require("../controllers/c_formation")

// Récupération du Router d'express
let router = express.Router()

/** Middleware time */
router.use((req, res, next) => {
    const event = new Date()
    console.log("Formation time : ", event.toString())
    next()
})


// Routage de la ressource Formation
router.get("", ctrlFormation.getAllFormations)

router.get("/:id", ctrlFormation.getFormation)

router.put("", ctrlFormation.addFormation)

router.patch("/:id", ctrlFormation.changeFormation)

router.delete("/:id", ctrlFormation.deleteFormation)

module.exports = router