/** Import des modules */
const DB = require('../db.config')
const Module = DB.Module

/**  */
exports.getAllModules = (req, res) => {
    Module.findAll()
        .then(modules => res.json({ data: modules }))
        .catch(e => res.status(500).json({ message: "Database Error", error: e }))
}

exports.getModule = async (req, res) => {
    let moduleId = parseInt(req.params.id)

    // Vérif présence et cohérence
    if (!moduleId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let module = await Module.findOne({ where: { id: moduleId } }) // include pour la jointure

        // Test si résultat
        if (module === null) {
            return res.status(404).json({ message: 'Module inexistant !' })
        }

        // Renvoi du module trouvé
        return res.json({ data: module })
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }
}

exports.addModule = async (req, res) => {
    const { nom, id_formation, id_formateur } = req.body

    // Validation des données reçues
    if (!nom || !id_formation) {
        return res.status(400).json({ message: "Données manquantes" })
    }

    try {
        // Vérification si le module existe
        let module = await Module.findOne({ where: { nom: nom }, raw: true })
        if (module !== null) {
            return res.status(409).json({ message: `La module ${nom} existe déjà ! ` })
        }

        // Création du module
        module = await Module.create(req.body)
        return res.json({ message: "Module créé", data: module })

    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }

}

exports.changeModule = async (req, res) => {
    let moduleId = parseInt(req.params.id)

    // Vérif présence et cohérence
    if (!moduleId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let module = await Module.findOne({ where: { id: moduleId }, raw: true }) // include pour la jointure

        // Test si résultat
        if (module === null) {
            return res.status(404).json({ message: 'Module inexistant !' })
        }

        // Mise à jour du module
        module = await Module.update(req.body, { where: { id: moduleId } })
        return res.json({ message: "Module mis à jour", data: module })

    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }

}


exports.deleteModule = async (req, res) => {
    let moduleId = parseInt(req.params.id)

    // Vérif présence et cohérence
    if (!moduleId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let module = await Module.findOne({ where: { id: moduleId }, raw: true }) // include pour la jointure

        // Test si résultat
        if (module === null) {
            return res.status(404).json({ message: 'Module inexistant !' })
        }

        // Suppression
        Module.destroy({ where: { id: moduleId }, force: true })
        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })

    }


}
