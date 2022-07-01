export default {
	props: ['notes'],
	template: `
<section v-if="notes">
	<input placeholder="Title" v-model="title" type="text" />
	<input v-model="value" type="text" placeholder="New Note" />
	<div class="buttons">
		<button @click="chooseTxt">txt</button>
		<button @click="chooseImg">img</button>
		<button @click="chooseTodo">Todo</button>
	</div>
</section>
`,
	data() {
		return {
			title: null,
			value: null,
			info: null,
			type: null,
		}
	},
	created() {},
	methods: {
		chooseTxt() {
			this.type = 'note-txt'
			this.info = {txt: this.value, title: this.title}
			let ans = {type: this.type, info: this.info}
			this.$emit('newNote', ans)
		},
		chooseImg() {
			this.type = 'note-img'
			this.info = {url: this.value, title: this.title}
			let ans = {type: this.type, info: this.info}
			this.$emit('newNote', ans)
		},
		chooseTodo() {
			this.type = 'note-todos'

			this.info = {
				label: this.title,
				todos: [{txt: this.value, doneAt: new Date()}],
			}
			let ans = {type: this.type, info: this.info, isPinned: false}
			console.log('ans:', ans)
			this.$emit('newNote', ans)
		},
	},
	computed: {},
	unmounted() {},
}
