import noteActions from '../note-actions.cmp.js'

export default {
	template: `
<section class="note-txt" v-if="info">
	<p>{{info.title}}</p>
	<textarea :style="{height:textareaHight +'px' }" :placeholder=" noteTxt" required  @keyup="reSize"></textarea>
	<note-actions  :note="note"></note-actions>
in</button> -->
</section>
`,
	components: {
		noteActions,
	},
	props: ['info', 'note'],
	data() {
		return {
			val: '',
			textareaHight: 300,
		}
	},
	methods: {
		reSize(ev) {
			this.val = ev.target.value
			this.textareaHight = ev.target.scrollHeight
			this.$emit('setVal', {val: this.val, hight: this.textareaHight})
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
