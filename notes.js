const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
};

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.blue.inverse('You notes:'));
    notes.forEach((note) => console.log(note.title))
};

const readNote = (title) => {
    const notes = loadNotes();
    const findedNote = notes.find((note) => note.title === title);
    if (findedNote) {
        console.log(chalk.blue.inverse(findedNote.title));
        console.log(findedNote.body);
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};
