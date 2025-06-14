const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title)

    //debugger
        // go on chrome://inspect
        // can use that to start debugging from chrome 

    if (!duplicateNote) {
         notes.push({
        title: title,
        body: body
    })

        saveNotes(notes)
        console.log(chalk.green.inverse('New Note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}



const removeNote = (title) => {
    const notes = loadNotes()
    const remainingTitles = notes.filter((note) => note.title !== title)

    if (notes.length > remainingTitles) {
        console.log(chalk.green.inverse('Note Removed!'))    
        saveNotes(remainingTitles)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}