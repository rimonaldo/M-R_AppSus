import {emailService} from '../../services/email-service/email-service.js'
import {noteService} from '../../services/note-service/note-service.js'
import {appService} from '../../services/main-app-service/main-app-service.js'
import {storageService} from '../../services/main-app-service/async-storage-service.js'

import noteFilter from '../../cmps/note/note-filter.cmp.js'
import noteFolderList from '../../cmps/note/note-folder-list.cmp.js'
import noteList from '../../cmps/note/note-list.cmp.js'
import noteCompose from '../../cmps/note/note-compose.cmp.js'

export default {
	template: `
    <section class="main-layout">
        <note-filter></note-filter>
        <note-folder-list></note-folder-list>
        <note-list   :notes="notes" ></note-list>
        <note-compose></note-compose>
    </section>
`,
	components: {
		noteFilter,
		noteFolderList,
		noteList,
		noteCompose,
	},
	data() {
		return {
			notes: [],
		}
	},
	methods: {},
	computed: {},
	created() {
		this.notes = noteService.createNotes()
	},

	unmounted() {},
}
