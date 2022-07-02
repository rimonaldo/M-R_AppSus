import noteVideo from './note-types/note-video.js'
import noteImg from '../../cmps/note/note-types/note-img.js'
import noteTxt from '../../cmps/note/note-types/note-txt.js'
import noteTodos from './note-types/note-todo.js'
import {appService} from '../../services/main-app-service/main-app-service.js'
import {noteService} from '../../services/note-service/note-service.js'

export default {
	props: ['notes'],
	template: `
<section v-if="notes ">
	<div v-for="(note,idx) in notes">
		<component
		class="grid-cube note-container"
			:is="note.type"
			:info="note.info"
			:note="note"
			:key="note.id"
			:id="note.id"
			:style="{backgroundColor: note.style.bgc ,color: note.style.color}"
			@setVal="setAns($event, idx)"
		>
		</component>
	</div>
</section>
  
`,

	components: {
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
			console.log('ans:', ans)
			this.answers[idx].txt = ans.val
			this.idx = idx
			let res = {ans, idx: this.idx}
			this.$emit('setNote', res)
		},
	},
	computed: {},

	mounted() {},
}
