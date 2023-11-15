// Import des modules
const express = require("express")
//const Module = require("../models/module")

const ctrlModule = require("../controllers/c_module")

// Récupération du Router d'express
let router = express.Router()

/** Middleware time */
router.use((req, res, next) => {
    const event = new Date()
    console.log("Module time : ", event.toString())
    next()
})


// Routage de la ressource Module
router.get("", ctrlModule.getAllModules)

router.get("/:id", ctrlModule.getModule)

router.put("", ctrlModule.addModule)

router.patch("/:id", ctrlModule.changeModule)

router.delete("/:id", ctrlModule.deleteModule)

module.exports = router