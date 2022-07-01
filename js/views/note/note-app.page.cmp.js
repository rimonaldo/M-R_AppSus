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
    <section class="main-layout  ">
			<note-nav></note-nav>
        <note-filter></note-filter>
				<note-add class="note-add" :notes="notes" @newNote="cerateNote($event,type)"></note-add>
        <note-list 
				class="list"
				v-if="notes"
				@removeNote="deleteNote($event,id )"
				 @setNote="setNotes($event,ans )" 
				 
				  :notes="notes" >
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
		}
	},
	methods: {
		setNotes(ans) {
			this.notes[ans.idx].info.txt = ans.ans

			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		},
		cerateNote(note) {
			let x = note.info
			console.log(' note.info-todos:', note.info.todos)

			this.notes.push(noteService.getEmptyNote(note.type, note.info))
			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		},

		// deleteNote(id) {
		// 	appService.remove(noteService.NOTES_KEY, id)
		// 	appService.query(noteService.NOTES_KEY).then((notes) => {
		// 		this.notes = notes
		// 		const idx = this.notes.findIndex((note) => note.id === id)
		// 		this.notes.splice(idx, 1)
		// 	})
		// },
	},
	computed: {},
	created() {
		appService.query(noteService.NOTES_KEY).then((notes) => {
			this.notes = notes
		})
	},
	mounted() {
		eventBus.on('deleteNote', (data) => {
			appService.remove(noteService.NOTES_KEY, data)
			appService.query(noteService.NOTES_KEY).then((notes) => {
				this.notes = notes
				const idx = this.notes.findIndex((note) => note.id === data)
				this.notes.splice(idx, 1)
			})
		})
		eventBus.on('doneTodo', (data) => {
			console.log(' this.notes:', this.notes)
			const noteIdx = this.notes.findIndex((note) => note.id === data.id)
			const currentNoteTodos = this.notes[noteIdx].info.todos
			currentNoteTodos.splice(data.idx, 1)
			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		})
		eventBus.on('addTodo', (data) => {
			const noteIdx = this.notes.findIndex((note) => note.id === data.id)
			const currentNote = this.notes[noteIdx]
			const obj = {txt: data.txt, doneAt: new Date()}
			currentNote.info.todos.push(obj)
			this.notes[noteIdx] = currentNote
			console.log('this.notes:', this.notes)
			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		})

		eventBus.on('changeTodo', (data) => {
			const noteIdx = this.notes.findIndex((note) => note.id === data.id)
			this.notes[noteIdx].info.todos[data.idx].txt = data.txt

			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		})
		eventBus.on('pinTodo', (data) => {
			console.log('data:', data)
			const noteIdx = this.notes.findIndex((note) => note.id === data)
			this.notes[noteIdx].isPinned = !this.notes[noteIdx].isPinned
			this.notes.sort((a, b) => Number(b.isPinned) - a.isPinned)
			console.log('this.notes:', this.notes)
		})
		eventBus.on('bgcNote', (data) => {
			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		})
	},

	unmounted() {},
}
