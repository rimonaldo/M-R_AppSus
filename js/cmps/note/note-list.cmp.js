import notePreview from '../../cmps/note/note-preview.cmp.js'
import noteTodos from '../../cmps/note/note-types/note-todos.js'
import noteImg from '../../cmps/note/note-types/note-img.js'
import noteTxt from '../../cmps/note/note-types/note-txt.js'

export default {
	props: ['notes'],
	template: `
    <section class="note-list">
        <ul>
            <li v-for="(note,idx) in notes" :key="note.id" class="note-preview-container">
            <component :is="note.type"  
                        :info="note.info" 
												:note="note"
                        @setVal="setAns($event, idx)">
                    </component>
										<p>{{answers[idx]  }}</p>
										<p>{{notes[0].info.txt}}</p>
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
			this.$emit('setNotes', this.val)
		},
	},
	computed: {},
	unmounted() {},
}
