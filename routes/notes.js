// Import des notes
const express = require("express")
//const Note = require("../models/note")

const ctrlNote = require("../controllers/c_note")

// Récupération du Router d'express
let router = express.Router()

/** Middleware time */
router.use((req, res, next) => {
    const event = new Date()
    console.log("Note time : ", event.toString())
    next()
})


// Routage de la ressource Note
router.get("", ctrlNote.getAllNotes)

router.get("/:id_formateur/:id_eleve", ctrlNote.getNote)

router.put("/:id_formateur/:id_eleve", ctrlNote.addNote)

router.patch("/:id_formateur/:id_eleve", ctrlNote.changeNote)

router.delete("/:id_formateur/:id_eleve", ctrlNote.deleteNote)

module.exports = router