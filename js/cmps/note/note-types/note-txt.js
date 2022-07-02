import noteActions from '../note-actions.cmp.js'
import {eventBus} from '.././.././../services/main-app-service/eventBus-service.js'

export default {
	template: `
<section class="note-txt" v-if="info">
	<p>{{info.title}}</p>
	<textarea
		:style="{height:textareaHight +'px',backgroundColor:note.style.bgc }"
		:placeholder=" noteTxt"
		required
		@keyup="reSize"
	></textarea>
	<note-actions :note="note"></note-actions>
</section>

`,
	components: {
		noteActions,
		eventBus,
	},
	props: ['info', 'note'],
	data() {
		return {
			val: '',
			textareaHight: 200,
		}
	},
	methods: {
		reSize(ev) {
			this.val = ev.target.value
			this.textareaHight = ev.target.scrollHeight
			eventBus.emit('setVal', {val: this.val, hight: this.textareaHight})
		},
	},

	computed: {
		noteTxt() {
			if (this.note.info.txt) {
				return this.note.info.txt
			} else return 'Enter text'
		},
	},
	created() {},
	mounted() {},
	unmounted() {},
}
