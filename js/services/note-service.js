import { utilService } from './util-service'
import { storageService } from './async-storage-service'

const NOTES_KEY = 'notes';
_createNotes()
export const noteService = {
    NOTES_KEY,
    query,
    remove,
    save,
    getEmptyNote,
    get,
    getNextNoteId,
    getPrevNoteId,
    createNote,
}

 
function createNote(title,msg,user='puki'){
    let note = getEmptyNote()
    note.title = title
    note.msg = msg
    note.user = user
    save(note.id)
}

// returns a promise 
function query() {
    return storageService.query(NOTES_KEY)
}

// remove item from model and storage
function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

// returns a promise
function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

// saves new item or updates existing item 
function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note)
    else return storageService.post(NOTES_KEY, note)
}


function getNextNoteId(noteId) {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            const idx = notes.findIndex(note => note.id === noteId)
            return (idx < notes.length - 1) ? notes[idx + 1].id : notes[0].id
        })
}

function getPrevNoteId(noteId) {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            const idx = notes.findIndex(note => note.id === noteId)
            return (idx < notes.length - 1 || idx >=0 ) ? notes[idx - 1].id : notes[0].id
        })
}

function getEmptyNote() {
    const id = utilService.makeId()
    return {
        title,
        id,
        msg,
        sentBy:null,
        sentAt: Date.now()
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = [];
        notes.push(_createNote('Audu Mea'));
        notes.push(_createNote('Fiak Ibasa'));
        notes.push(_createNote('Subali Pesha'));
        notes.push(_createNote('Mitsu Bashi'));
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes;
}

function _createNote(title = "New note!", msg) {
    const note = {
        id: utilService.makeId(),
        title,
        msg,
        sentAt: Date.now(),
    };
    return note;
}
