/** Import des modules */
const DB = require('../db.config')
const Formation = DB.Formation

/**  */
exports.getAllFormations = (req, res) => {
    Formation.findAll()
        .then(formations => res.json({ data: formations }))
        .catch(e => res.status(500).json({ message: "Database Error", error: e }))
}

exports.getFormation = async (req, res) => {
    let formationId = parseInt(req.params.id)

    // Vérif présence et cohérence
    if (!formationId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let formation = await Formation.findOne({ where: { id: formationId } }) // include pour la jointure

        // Test si résultat
        if (formation === null) {
            return res.status(404).json({ message: 'Formation inexistante !' })
        }

        // Renvoi de la formation trouvée
        return res.json({ data: formation })
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }
}

exports.addFormation = async (req, res) => {
    const { nom, debut, fin } = req.body

    // Validation des données reçues
    if (!nom || !debut || !fin) {
        return res.status(400).json({ message: "Données manquantes" })
    }

    try {
        // Vérification si la formation existe
        let formation = await Formation.findOne({ where: { nom: nom }, raw: true })
        if (formation !== null) {
            return res.status(409).json({ message: `La formation ${nom} existe déjà ! ` })
        }

        // Création de la formation
        formation = await Formation.create(req.body)
        return res.json({ message: "Formation créée", data: formation })

    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }

}

exports.changeFormation = async (req, res) => {
    let formationId = parseInt(req.params.id)

    // Vérif présence et cohérence
    if (!formationId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let formation = await Formation.findOne({ where: { id: formationId }, raw: true }) // include pour la jointure

        // Test si résultat
        if (formation === null) {
            return res.status(404).json({ message: 'Formation inexistante !' })
        }

        // Mise à jour de la formation
        formation = await Formation.update(req.body, { where: { id: formationId } })
        return res.json({ message: "Formation mise à jour", data: formation })

    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }

}


exports.deleteFormation = async (req, res) => {
    let formationId = parseInt(req.params.id)

    // Vérif présence et cohérence
    if (!formationId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let formation = await Formation.findOne({ where: { id: formationId }, raw: true }) // include pour la jointure

        // Test si résultat
        if (formation === null) {
            return res.status(404).json({ message: 'Formation inexistante !' })
        }

        // Suppression
        Formation.destroy({ where: { id: formationId }, force: true })
        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })

    }


}
