import {utilService} from '../main-app-service/util-service.js'
import {storageService} from '../main-app-service/async-storage-service.js'

const NOTES_KEY = 'notes'
const gNotes = [
	{
		id: 'n10ax1',
		type: 'note-txt',
		isPinned: true,
		info: {
			txt: `It must be getting early
			Clocks are running late
			Paint by numbers morning sky
			Looks so phony
			`,
			title: 'My Note!',
		},
	},
	{
		id: 'n10asxc2',
		type: 'note-img',
		info: {
			url: 'https://upload.wikimedia.org/wikipedia/en/1/1c/LightningBoltSkull.gif',
			title: 'Bobi and Me',
		},
		style: {
			backgroundColor: '#00d',
		},
	},
	{
		id: 'n1asfc03',
		type: 'note-todos',
		info: {
			label: 'Get my stuff together',
			todos: [
				{txt: 'Driving liscence', doneAt: null},
				{txt: 'Coding power', doneAt: 187111111},
				{txt: 'holaPapa', doneAt: null},
				{txt: 'The Best Of', doneAt: 187111111},
			],
		},
	},
	{
		id: 'nasfvca101',
		type: 'note-txt',
		isPinned: true,
		info: {
			txt: `Dawn is breaking everywhere
			Light a candle, curse the glare
			Draw the curtains, I don't care
			'Cause it's alright
			`,
			title: 'My Note!',
		},
	},
	{
		id: 'n10yjyrjw2',
		type: 'note-img',
		info: {
			url: 'http://cdn.shopify.com/s/files/1/0182/2915/products/GFRegularPosterforWebHighSize.png?v=1618940642',
			title: 'Bobi and Me',
		},
		style: {
			backgroundColor: '#00d',
		},
	},
	{
		id: 'n1fsghdfghjn03',
		type: 'note-todos',
		info: {
			label: 'I will get byr',
			todos: [
				{txt: 'Driving liscence', doneAt: null},
				{txt: 'Grateful  power', doneAt: 187111111},
				{txt: 'have  Closet', doneAt: null},
				{txt: 'minimum power', doneAt: 187111111},
				{txt: 'specifics  liscence', doneAt: null},
				{txt: 'Coding covers ', doneAt: 187111111},
			],
		},
	},
	{
		id: 'njlhjlf,i101',
		type: 'note-txt',
		isPinned: true,
		info: {
			txt: `I will get by
			I will get by
			I will get by
			I will survive
			`,
			title: 'My Note!',
		},
	},
	{
		id: 'n10arehartfhym2',
		type: 'note-img',
		info: {
			url: 'https://ca-times.brightspotcdn.com/dims4/default/6a36f97/2147483647/strip/true/crop/2048x1632+0+0/resize/840x669!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fac%2F28%2F44c51c04417e357c9e733424a01b%2Fla-et-ms-grateful-dead-members-plan-final-show-001',
			title: 'Bobi and Me',
		},
		style: {
			backgroundColor: '#00d',
		},
	},
	{
		id: 'n1raeha03',
		type: 'note-todos',
		info: {
			label: ' Merlinus Ambrosius',
			todos: [
				{txt: 'Medieval legend', doneAt: null},
				{txt: 'Roman consul', doneAt: 187111111},
			],
		},
	},
	{
		id: 'n1reatHAerh01',
		type: 'note-txt',
		isPinned: true,
		info: {
			txt: `I see you got your list out
			Say your piece and get out
			Yes, I get the gist of it
			But it's alright
			`,
			title: 'My Note!',
		},
	},
	{
		id: 'nerahJNHAtej102',
		type: 'note-img',
		info: {
			url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-UrsRt6y3OkAOLtOZaTb_TxFr-UAcd_kR4Q&usqp=CAU',
			title: 'Bobi and Me',
		},
		style: {
			backgroundColor: '#00d',
		},
	},
	{
		id: 'n10atgrjytask3',
		type: 'note-todos',
		info: {
			label: 'Sorry that you feel that way',
			todos: [
				{txt: 'The only thing there is to say', doneAt: null},
				{txt: 'Every silver linings got a', doneAt: 187111111},
				{txt: 'Touch of grey', doneAt: 187111111},
			],
		},
	},
	// {
	// 	id: 'n10aassd',
	// 	type: 'note-video',
	// 	info: {
	// 		url: 'https://www.youtube.com/watch?v=mzvk0fWtCs0',
	// 		title: 'the best song in the world',
	// 	},
	// },
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
