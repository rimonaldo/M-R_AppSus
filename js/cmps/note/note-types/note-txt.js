export default {
	props: ['info', 'note'],
	template: `
<section class="note-txt">
<p>text note</p>
<textarea :style="{height:textareaHight +'px' }" :placeholder=" noteTxt" required  @keyup="reSize"></textarea>
<button @click="deleteNote">X</button>
</section>
`,
	data() {
		return {
			val: '',
			textareaHight: null,
		}
	},
	methods: {
		reSize(ev) {
			this.val = ev.target.value
			this.textareaHight = ev.target.scrollHeight
			this.$emit('setVal', this.val)
		},

		deleteNote(ev) {
			let id = this.note.id
			this.$emit('deleteNote', id)
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
	components: {},
}
