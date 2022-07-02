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
			color: '#000000',
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
			color: '#000000',
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
			color: '#000000',
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
			color: '#000000',
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
			color: '#000000',
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
			color: '#000000',
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
			color: '#000000',
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
			color: '#000000',
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
			color: '#000000',
		},
	},

	{
		id: 'n10aassd',
		isPinned: false,
		type: 'note-map',
		info: {
			url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.361048929129!2d34.79012768482978!3d32.05948208119463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b71d3251013%3A0xf0063ca2d3229c98!2z15zXlCDXkteV15XXkNeo15PXmdeUIDE1LCDXqtecINeQ15HXmdeRLdeZ16TXlQ!5e0!3m2!1siw!2sil!4v1656751341295!5m2!1siw!2sil',
			title: 'my home',
		},
		style: {
			bgc: '#d8cedf',
			color: '#000000',
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
