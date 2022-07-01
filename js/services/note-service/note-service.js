import {utilService} from '../main-app-service/util-service.js'
import {storageService} from '../main-app-service/async-storage-service.js'

const NOTES_KEY = 'notes'
const gNotes = [
	{
		id: 'n10ax1',
		type: 'note-txt',
		isPinned: false,
		info: {
			txt: `It must be getting early
			Clocks are running late
			Paint by numbers morning sky
			Looks so phony
			`,
			title: 'My Note!',
		},

		style: {
			bgc: '#d8cedf',
		},
	},
	{
		id: 'n10asxc2',
		type: 'note-img',
		isPinned: false,
		info: {
			url: 'https://upload.wikimedia.org/wikipedia/en/1/1c/LightningBoltSkull.gif',
			title: 'Bobi and Me',
		},
		style: {
			bgc: '#d8cedf',
		},
	},
	{
		id: 'n1asfc03',
		type: 'note-todos',
		isPinned: false,
		info: {
			label: 'Get my stuff together',
			todos: [
				{txt: 'Driving liscence', doneAt: null},
				{txt: 'Coding power', doneAt: 187111111},
				{txt: 'holaPapa', doneAt: null},
				{txt: 'The Best Of', doneAt: 187111111},
			],
		},
		style: {
			bgc: '#d8cedf',
		},
	},
	{
		id: 'nasfvca101',
		type: 'note-txt',
		isPinned: false,
		info: {
			txt: `Dawn is breaking everywhere
			Light a candle, curse the glare
			Draw the curtains, I don't care
			'Cause it's alright
			`,
			title: 'My Note!',
		},
		style: {
			bgc: '#d8cedf',
		},
	},
	{
		id: 'n10yjyrjw2',
		type: 'note-img',
		isPinned: false,
		info: {
			url: 'http://cdn.shopify.com/s/files/1/0182/2915/products/GFRegularPosterforWebHighSize.png?v=1618940642',
			title: 'Bobi and Me',
		},
		style: {
			bgc: '#d8cedf',
		},
	},

	{
		id: 'n10arehartfhym2',
		type: 'note-img',
		isPinned: false,
		info: {
			url: 'https://ca-times.brightspotcdn.com/dims4/default/6a36f97/2147483647/strip/true/crop/2048x1632+0+0/resize/840x669!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fac%2F28%2F44c51c04417e357c9e733424a01b%2Fla-et-ms-grateful-dead-members-plan-final-show-001',
			title: 'Bobi and Me',
		},
		style: {
			bgc: '#d8cedf',
		},
	},

	{
		id: 'n1reatHAerh01',
		type: 'note-txt',
		isPinned: false,
		info: {
			txt: `I see you got your list out
			Say your piece and get out
			Yes, I get the gist of it
			But it's alright
			`,
			title: 'My Note!',
		},
		style: {
			bgc: '#d8cedf',
		},
	},
	{
		id: 'nerahJNHAtej102',
		type: 'note-img',
		isPinned: false,
		info: {
			url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-UrsRt6y3OkAOLtOZaTb_TxFr-UAcd_kR4Q&usqp=CAU',
			title: 'Bobi and Me',
		},
		style: {
			bgc: '#d8cedf',
		},
	},

	{
		id: 'n10aassd',
		isPinned: false,
		type: 'note-video',
		info: {
			url: 'https://www.youtube.com/embed/hFFopPPrGiE',
			title: 'my video',
		},
		style: {
			bgc: '#d8cedf',
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
	let style = {bgc: '#d8cedf'}
	return {
		type,
		id,
		isPinned: false,
		info,
		crateAt: Date.now(),
		style,
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
