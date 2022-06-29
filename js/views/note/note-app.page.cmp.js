import {utilService} from '../../services/main-app-service/util-service.js'
import {noteService} from '../../services/note-service/note-service.js'
import {appService} from '../../services/main-app-service/main-app-service.js'
import {storageService} from '../../services/main-app-service/async-storage-service.js'

import noteAdd from '../../cmps/note/note-create-cmp.js'
import noteNav from '../../cmps/note/note-nav-cmp.js'
import noteFilter from '../../cmps/note/note-filter.cmp.js'
import noteFolderList from '../../cmps/note/note-folder-list.cmp.js'
import noteList from '../../cmps/note/note-list.cmp.js'
import noteCompose from '../../cmps/note/note-compose.cmp.js'

export default {
	template: `
    <section class="main-layout ">
			<note-nav></note-nav>
        <note-filter></note-filter>
				<note-add :notes="notes" @newTxt="cerateNote($event,type)"></note-add>
        <note-folder-list></note-folder-list>
        <note-list 
				v-if="notes"
				@removeNote="deleteNote($event,id )"
				 @setNote="setNotes($event,ans )" 
				  :notes="notes" >
				</note-list>
        <note-compose></note-compose>
    </section>
`,
	components: {
		noteFilter,
		noteFolderList,
		noteList,
		noteCompose,
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
		cerateNote(type) {
			this.notes.push(noteService.getEmptyNote(type))
			utilService.saveToStorage(noteService.NOTES_KEY, this.notes)
		},

		deleteNote(id) {
			appService.remove(noteService.NOTES_KEY, id)
		},
	},
	computed: {},
	created() {
		appService.query(noteService.NOTES_KEY).then((notes) => {
			this.notes = notes
		})
	},

	unmounted() {},
}
