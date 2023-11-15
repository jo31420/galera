/** Import des modules */
const DB = require('../db.config')
const Formateur = DB.Formateur

/**  */
exports.getAllFormateurs = (req, res) => {
    Formateur.findAll()
        .then(formateurs => res.json({ data: formateurs }))
        .catch(e => res.status(500).json({ message: "Database Error", error: e }))
}

exports.getFormateur = async (req, res) => {
    let formateurId = parseInt(req.params.id)

    // Vérif présence et cohérence
    if (!formateurId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let formateur = await Formateur.findOne({ where: { id: formateurId } }) // include pour la jointure

        // Test si résultat
        if (formateur === null) {
            return res.status(404).json({ message: 'Formateur inexistante !' })
        }

        // Renvoi du formateur trouvée
        return res.json({ data: formateur })
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }
}

exports.addFormateur = async (req, res) => {
    const { nom, prenom, email, password } = req.body

    // Validation des données reçues
    if (!nom || !prenom || !email || !password) {
        return res.status(400).json({ message: "Données manquantes" })
    }

    try {
        // Vérification si le formateur existe
        let formateur = await Formateur.findOne({ where: { nom: nom }, raw: true })
        if (formateur !== null) {
            return res.status(409).json({ message: `La formateur ${nom} existe déjà ! ` })
        }

        // Création du formateur
        formateur = await Formateur.create(req.body)
        return res.json({ message: "Formateur créée", data: formateur })

    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }

}

exports.changeFormateur = async (req, res) => {
    let formateurId = parseInt(req.params.id)

    // Vérif présence et cohérence
    if (!formateurId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let formateur = await Formateur.findOne({ where: { id: formateurId }, raw: true }) // include pour la jointure

        // Test si résultat
        if (formateur === null) {
            return res.status(404).json({ message: 'Formateur inexistante !' })
        }

        // Mise à jour du formateur
        formateur = await Formateur.update(req.body, { where: { id: formateurId } })
        return res.json({ message: "Formateur mise à jour", data: formateur })

    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }

}


exports.deleteFormateur = async (req, res) => {
    let formateurId = parseInt(req.params.id)

    // Vérif présence et cohérence
    if (!formateurId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let formateur = await Formateur.findOne({ where: { id: formateurId }, raw: true }) // include pour la jointure

        // Test si résultat
        if (formateur === null) {
            return res.status(404).json({ message: 'Formateur inexistante !' })
        }

        // Suppression
        Formateur.destroy({ where: { id: formateurId }, force: true })
        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })

    }


}
