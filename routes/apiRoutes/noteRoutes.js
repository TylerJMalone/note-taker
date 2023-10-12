const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { notes } = require('../../db/db.json');
const { readFromFile, writeToFile, readAndAppend } = require('../../lib/fsUtils');

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
    } else {
        res.json('Error in posting feedback');
    }
});

router.delete('/notes/:id', (req, res) => {
    const note = findNoteById(req.params.id, notes);
    deleteNote(note, notes);
    res.json(notes);
});

module.exports = router;