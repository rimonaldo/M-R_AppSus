import {utilService} from '../../services/main-app-service/util-service.js'
import {noteService} from '../../services/note-service/note-service.js'
import {appService} from '../../services/main-app-service/main-app-service.js'
import {eventBus} from '../../services/main-app-service/eventBus-service.js'
import {storageService} from '../../services/main-app-service/async-storage-service.js'

import noteAdd from '../../cmps/note/note-create-cmp.js'
import noteNav from '../../cmps/note/note-nav-cmp.js'
import noteFilter from '../../cmps/note/note-filter.cmp.js'
import noteList from '../../cmps/note/note-list.cmp.js'

export default {
	template: `
  <section class="main-layout">
	<note-nav></note-nav>
	<note-filter></note-filter>
	<note-add class="note-add" :notes="notes" @newNote="cerateNote($event,type)"></note-add>
		<note-list class="list" v-if="notes" @setNote="setNotes($event,ans )" :notes="notesForDisplay">

	</note-list>
</section>

`,
	components: {
		noteFilter,
		noteList,
		noteNav,
		noteAdd,
	},
	data() {
		return {
			notes: null,
			filterBy: {
				title: '',
			},
			unsubscribeDelete: null,
			unsubscribeDoneTodo: null,
			unsubscribeAddTodo: null,
			unsubscribeChangeTodo: null,
			unsubscribePinTodo: null,
			unsubscribeBgc: null,
			unsubscribeCopyNote: null,
			unsubscribeTxtColorNote: null,
			unsubscribeFilterBy: null,
		}
	},
	methods: {
		setNotes(ans) {
			this.notes[ans.idx].info.txt = ans.ans

			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		},
		cerateNote(note) {
			let x = note.info
			this.notes.push(noteService.getEmptyNote(note.type, note.info))
			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		},
		// setFilter(filterBy) {
		// 	this.filterBy = filterBy
		// },
	},

	computed: {
		notesForDisplay() {
			var notes = this.notes
			const regex = new RegExp(this.filterBy.title.title, 'i')
			console.log('filterBy.title:', this.filterBy.title)
			notes = notes.filter((note) => regex.test(note.info.title))
			console.log('notes:', notes)
			return notes
		},
	},

	created() {
		appService.query(noteService.NOTES_KEY).then((notes) => {
			this.notes = notes
		})
		this.unsubscribeFilterBy = eventBus.on('setFilter', (data) => {
			this.filterBy.title = data
		})

		this.unsubscribeDelete = eventBus.on('deleteNote', (data) => {
			appService.remove(noteService.NOTES_KEY, data)
			appService.query(noteService.NOTES_KEY).then((notes) => {
				this.notes = notes
				const idx = this.notes.findIndex((note) => note.id === data)
				this.notes.splice(idx, 1)
			})
		})
		this.unsubscribeDoneTodo = eventBus.on('doneTodo', (data) => {
			console.log(' this.notes:', this.notes)
			const noteIdx = this.notes.findIndex((note) => note.id === data.id)
			const currentNoteTodos = this.notes[noteIdx].info.todos
			currentNoteTodos.splice(data.idx, 1)
			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		})
		this.unsubscribeAddTodo = eventBus.on('addTodo', (data) => {
			const noteIdx = this.notes.findIndex((note) => note.id === data.id)
			const currentNote = this.notes[noteIdx]
			const obj = {txt: data.txt, doneAt: new Date()}
			currentNote.info.todos.push(obj)
			this.notes[noteIdx] = currentNote
			console.log('this.notes:', this.notes)
			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		})

		this.unsubscribeChangeTodo = eventBus.on('changeTodo', (data) => {
			const noteIdx = this.notes.findIndex((note) => note.id === data.id)
			this.notes[noteIdx].info.todos[data.idx].txt = data.txt

			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		})
		this.unsubscribePinTodo = eventBus.on('pinTodo', (data) => {
			const noteIdx = this.notes.findIndex((note) => note.id === data)
			this.notes[noteIdx].isPinned = !this.notes[noteIdx].isPinned
			this.notes.sort((a, b) => Number(b.isPinned) - a.isPinned)
			console.log('this.notes:', this.notes)
		})
		this.unsubscribeBgc = eventBus.on('bgcNote', (data) => {
			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		})

		this.unsubscribeTxtColorNote = eventBus.on('txtColorNote', (data) => {
			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		})

		this.unsubscribeCopyNote = eventBus.on('copyNote', (data) => {
			const idx = this.notes.findIndex((note) => note.id === data)
			const copyNotes = this.notes.slice(0)
			const newNote = copyNotes.splice(idx, 1)
			this.notes.push(newNote[0])
			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		})
	},
	mounted() {},

	unmounted() {
		this.unsubscribeDelete()
		this.unsubscribeDoneTodo()
		this.unsubscribeAddTodo()
		this.unsubscribeChangeTodo()
		this.unsubscribePinTodo()
		this.unsubscribeBgc()
	},
}
