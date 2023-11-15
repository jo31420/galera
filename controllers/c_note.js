/** Import des notes */
const DB = require('../db.config')
const Note = DB.Note

/**  */
exports.getAllNotes = (req, res) => {
    Note.findAll()
        .then(notes => res.json({ data: notes }))
        .catch(e => res.status(500).json({ message: "Database Error", error: e }))
}

exports.getNote = async (req, res) => {
    let formateurId = parseInt(req.params.id_formateur)
    let eleveId = parseInt(req.params.id_eleve)

    // Vérif présence et cohérence
    if (!formateurId || !eleveId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Recup
        let note = await Note.findOne({ where: { id_formateur: formateurId, id_eleve: eleveId } }) // include pour la jointure

        // Test si résultat
        if (note === null) {
            return res.status(404).json({ message: 'Note inexistante !' })
        }

        // Renvoi de la note trouvé
        return res.json({ data: note })
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }
}

exports.addNote = async (req, res) => {
    let formateurId = parseInt(req.params.id_formateur)
    let eleveId = parseInt(req.params.id_eleve)
    const { valeur, commentaire, id_module } = req.body

    // Vérif présence et cohérence
    if (!eleveId || !formateurId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    // Validation des données reçues
    if (!valeur || !id_module) {
        return res.status(400).json({ message: "Données manquantes" })
    }

    try {
        // Vérification si le note existe
        let note = await Note.findOne({ where: { id_formateur: formateurId, id_eleve: eleveId }, raw: true })
        if (note !== null) {
            return res.status(409).json({ message: `La note ${nom} existe déjà ! ` })
        }

        // Création de la note
        //note = await Note.create(req.body)
        note = await Note.create({ id_formateur: formateurId, id_eleve: eleveId, valeur: valeur, commentaire: commentaire, id_module: id_module })
        return res.json({ message: "Note créé", data: note })

    } catch (err) {
        return res.status(500).json({ message: "Database error note", error: err })
    }

}

exports.changeNote = async (req, res) => {
    let formateurId = parseInt(req.params.id_formateur)
    let eleveId = parseInt(req.params.id_eleve)
    const { valeur, commentaire, id_module } = req.body

    // Vérif présence et cohérence
    if (!eleveId || !formateurId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    // Validation des données reçues
    if (!valeur || !id_module) {
        return res.status(400).json({ message: "Données manquantes" })
    }

    try {
        // Vérification si le note existe
        let note = await Note.findOne({ where: { id_formateur: formateurId, id_eleve: eleveId }, raw: true })
        if (note === null) {
            return res.status(409).json({ message: `Note inexistante ! ` })
        }

        // Mise à jour de la note
        note = await Note.update(req.body, { where: { id_formateur: formateurId, id_eleve: eleveId }, raw: true })
        return res.json({ message: "Note mis à jour", data: note })

    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })
    }

}


exports.deleteNote = async (req, res) => {
    let formateurId = parseInt(req.params.id_formateur)
    let eleveId = parseInt(req.params.id_eleve)

    // Vérif présence et cohérence
    if (!eleveId || !formateurId) {
        return res.json(400).json({ message: 'Parametre manquant' })
    }

    try {
        // Vérification si la note existe
        let note = await Note.findOne({ where: { id_formateur: formateurId, id_eleve: eleveId }, raw: true })
        // Test si résultat
        if (note === null) {
            return res.status(404).json({ message: 'Note inexistant !' })
        }

        // Suppression
        Note.destroy({ where: { id_formateur: formateurId, id_eleve: eleveId }, force: true })
        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err })

    }


}
