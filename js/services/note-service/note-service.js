import {utilService} from '../main-app-service/util-service.js'
import {storageService} from '../main-app-service/async-storage-service.js'

const NOTES_KEY = 'notes'
const gNotes = [
	{
		id: 'n101',
		type: 'note-txt',
		isPinned: true,
		info: {
			txt: 'Fullstack Me Baby!',
		},
	},
	{
		id: 'n102',
		type: 'note-img',
		info: {
			url: 'http://some-img/me',
			title: 'Bobi and Me',
		},
		style: {
			backgroundColor: '#00d',
		},
	},
	{
		id: 'n103',
		type: 'note-todos',
		info: {
			label: 'Get my stuff together',
			todos: [
				{txt: 'Driving liscence', doneAt: null},
				{txt: 'Coding power', doneAt: 187111111},
			],
		},
	},
]

createNotes()
export const noteService = {
	getEmptyNote,
	getNextNoteId,
	getPrevNoteId,
	createNote,
	createNotes,
	getById,
}

function getById() {
	return Promise.resolve(survey)
}

function createNote(type) {
	let note = getEmptyNote()
	note.type = type

	save(note.id)
}

function getNextNoteId(noteId) {
	return storageService.query(NOTES_KEY).then((notes) => {
		const idx = notes.findIndex((note) => note.id === noteId)
		return idx < notes.length - 1 ? notes[idx + 1].id : notes[0].id
	})
}

function getPrevNoteId(noteId) {
	return storageService.query(NOTES_KEY).then((notes) => {
		const idx = notes.findIndex((note) => note.id === noteId)
		return idx < notes.length - 1 || idx >= 0 ? notes[idx - 1].id : notes[0].id
	})
}

function getEmptyNote() {
	const id = utilService.makeId()
	return {
		type,
		id,
		// msg,
		// sentBy: null,
		crateAt: Date.now(),
	}
}

function createNotes() {
	return gNotes
	let notes = utilService.loadFromStorage(NOTES_KEY)
	if (!notes || !notes.length) {
		notes = []
		notes.push(_createNote())
		notes.push(_createNote())
		notes.push(_createNote())
		notes.push(_createNote())
		utilService.saveToStorage(NOTES_KEY, notes)
	}
	return notes
}

function _createNote(type = 'note-txt') {
	const note = {
		id: utilService.makeId(),
		type,
		isPinned: false,
		info: {
			txt: 'Note',
		},
		crateAt: Date.now(),
	}
	console.log('note:', note)
	return note
}

function getNotes() {
	return
}
