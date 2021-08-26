const { default: chalk } = require("chalk")
const fs = require("fs")

const getNotes = () => "My notes..."

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    }else{
        console.log(chalk.red.inverse("Note title taken!"))
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
const removeNote = (title) => {
    const notes = loadNotes()
    const notesFiltered = notes.filter((note)=>note.title !== title)
    if (notesFiltered.length === notes.length){
        console.log(chalk.red.inverse("Title not found"))
    }else {
        saveNotes(notesFiltered)
        console.log(chalk.green.inverse("Note titled "+title+" removed successfully!"))
    }
}
const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note)=> note.title === title)
    if(noteToRead){
        console.log(chalk.blue.inverse.bold(noteToRead.title))
        console.log(noteToRead.body)
    }else{
        console.log(chalk.red.inverse.bold("Title not found"))
    }
   
}
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellow.bold.inverse("Your notes"))
    notes.forEach(note => {
        console.log("Title :" + note.title )
    });
}

const loadNotes = () => {

    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    }catch(e){
        return []
    }
    
    
}

module.exports =  {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}