const Note = require('../../models/note')

async function createNote(req, res){
    console.log({req});
    try {
        const note = await Note.create(req.body)
        res.json(note)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    createNote,
}