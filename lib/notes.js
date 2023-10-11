const fs = require('fs');
const path = require('path');   

const createNewNote = (note, notesArray) => {
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
};

const deleteNote = (note, notesArray) => {
    const index = notesArray.indexOf(note);
    notesArray.splice(index, 1);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
};

const findNoteById = (id, notesArray) => {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

const editNote = (editednote, notesArray) => {
    const index = notesArray.FindIndex(note => note.id === editednote.id);

    notesArray.splice(index, 1);
    notesArray.splice(index, 0, editednote);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
        );
    };

    module.exports = { createNewNote, deleteNote, findNoteById, editNote };