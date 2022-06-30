import notePreview from '../../cmps/note/note-preview.cmp.js'
import noteVideo from './note-types/note-video.js'
import noteImg from '../../cmps/note/note-types/note-img.js'
import noteTxt from '../../cmps/note/note-types/note-txt.js'
import noteTodos from './note-types/note-todo.js'
import {appService} from '../../services/main-app-service/main-app-service.js'
import {noteService} from '../../services/note-service/note-service.js'

export default {
	props: ['notes'],
	template: `
    <section v-if="notes" >
        <ul>
            <li v-for="(note,idx) in notes" :key="note.id" class="note">
            <component :is="note.type"  
                        :info="note.info" 
												:note="note"
												:id="id"
												@deleteNote="deleteNote($event,id)"
                        @setVal="setAns($event, idx)"
												class="note-container">
                    </component>
										
										<p></p>
										<p></p>
                <note-preview   :note="note"/>
            </li>
        </ul>
				
    </section>
`,

	components: {
		notePreview,
		noteTxt,
		noteImg,
		noteTxt,
		noteVideo,
		noteTodos,
	},
	data() {
		return {
			survey: null,
			answers: this.notes,
			idx: 0,
		}
	},
	created() {},
	methods: {
		setAns(ans, idx) {
			this.answers[idx].txt = ans
			this.idx = idx
			let res = {ans, idx: this.idx}
			this.$emit('setNote', res)
		},
		deleteNote(id) {
			this.$emit('removeNote', id)
		},
	},
	computed: {},

	mounted() {},
}
