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
			url: 'https://upload.wikimedia.org/wikipedia/en/1/1c/LightningBoltSkull.gif',
			title: 'Bobi and Me',
		},
		style: {
			backgroundColor: '#00d',
		},
	},
	// {
	// 	id: 'n103',
	// 	type: 'note-todos',
	// 	info: {
	// 		label: 'Get my stuff together',
	// 		todos: [
	// 			{txt: 'Driving liscence', doneAt: null},
	// 			{txt: 'Coding power', doneAt: 187111111},
	// 		],
	// 	},
	// },
	{
		id: 'n10aassd',
		type: 'note-video',
		info: {
			url: 'https://www.youtube.com/watch?v=mzvk0fWtCs0',
			title: 'the best song in the world',
		},
	},
]

export const noteService = {
	NOTES_KEY,
	getEmptyNote,
	getNextNoteId,
	getPrevNoteId,
	createNote,
	createNotes,
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

function getEmptyNote(type, info) {
	let id = utilService.makeId()

	return {
		type,
		id,
		isPinned: false,
		info,
		crateAt: Date.now(),
	}
}

createNotes()
function createNotes() {
	let notes = utilService.loadFromStorage(NOTES_KEY)
	if (!notes || !notes.length) {
		notes = []
		notes.push(_createNote())
		notes.push(_createNote())
		notes.push(_createNote())
		notes.push(_createNote())
		utilService.saveToStorage(NOTES_KEY, gNotes)
	}
	return notes
}

function _createNote(type, info) {
	const note = {
		id: utilService.makeId(),
		type,
		isPinned: false,
		info,
		crateAt: Date.now(),
	}
	return note
}

function getNotes() {
	return
}
