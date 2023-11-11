// Import des modules
const express = require("express")
const Formation = require("../models/formation")

// Récupération du Router d'express
let router = express.Router()

// Routage de la ressource Formation
routage.get("", (req, res) => {
    Formation.findAll()
        .then(formations => res.json({ data: formations }))
        .catch(err => res.status(500).json({ message: "Database Error", error: err }))
})

routage.get("/:id", (req, res) => {
    let formationId = parseInt(req.params.id)

    // Vérification sur le champ id
    if (!formationId) {
        return res.json(400).json({ message: "Missing parameter" })
    }

    // Récupération de la formation
    Formation.findOne({ where: {formation_id: formationId }, raw: true})
    .then()
})

router.put("")

router.patch("/:id")

router.delete("/:id")