/** Import des modules */
const DB = require('../db.config')
const Eleve = DB.Eleve

/**  */
exports.getAllEleves = (req, res) => {
    Eleve.findAll()
        .then(eleves => res.json({ data: eleves }))
        .catch(e => res.status(500).json({ message: "Database Error", error: e }))
}

exports.getEleve = async (req, res) => {
    let eleveId = parseInt(req.params.id)

    // Vérif présence et cohérence
    if (!eleveId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let eleve = await Eleve.findOne({ where: { id: eleveId } }) // include pour la jointure

        // Test si résultat
        if (eleve === null) {
            return res.status(404).json({ message: 'Eleve inexistante !' })
        }

        // Renvoi de l'élève trouvée
        return res.json({ data: eleve })
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }
}

exports.addEleve = async (req, res) => {
    const { nom, prenom, email, password, id_formation } = req.body

    // Validation des données reçues
    if (!nom || !prenom || !email || !password || !id_formation) {
        return res.status(400).json({ message: "Données manquantes" })
    }

    try {
        // Vérification si l'élève existe
        let eleve = await Eleve.findOne({ where: { nom: nom }, raw: true })
        if (eleve !== null) {
            return res.status(409).json({ message: `La eleve ${nom} existe déjà ! ` })
        }

        // Création de l'élève
        eleve = await Eleve.create(req.body)
        return res.json({ message: "Eleve créée", data: eleve })

    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }

}

exports.changeEleve = async (req, res) => {
    let eleveId = parseInt(req.params.id)

    // Vérif présence et cohérence
    if (!eleveId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let eleve = await Eleve.findOne({ where: { id: eleveId }, raw: true }) // include pour la jointure

        // Test si résultat
        if (eleve === null) {
            return res.status(404).json({ message: 'Eleve inexistante !' })
        }

        // Mise à jour de l'élève
        eleve = await Eleve.update(req.body, { where: { id: eleveId } })
        return res.json({ message: "Eleve mise à jour", data: eleve })

    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }

}


exports.deleteEleve = async (req, res) => {
    let eleveId = parseInt(req.params.id)

    // Vérif présence et cohérence
    if (!eleveId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let eleve = await Eleve.findOne({ where: { id: eleveId }, raw: true }) // include pour la jointure

        // Test si résultat
        if (eleve === null) {
            return res.status(404).json({ message: 'Eleve inexistante !' })
        }

        // Suppression
        Eleve.destroy({ where: { id: eleveId }, force: true })
        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })

    }


}
