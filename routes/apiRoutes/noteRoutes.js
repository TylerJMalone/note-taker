const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { notes } = require('../../db/db.json');
const { createNewNote, deleteNote, findNoteById, editNote } = require('../../lib/notes');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    if (!req.body.id) { 
        req.body.id = uuidv4();
        createNewNote(req.body, notes);
    } else {
        editNote(req.body, notes);
    }
    res.json(notes);
});

router.delete('/notes/:id', (req, res) => {
    const note = findNoteById(req.params.id, notes);
    deleteNote(note, notes);
    res.json(notes);
});

module.exports = router;