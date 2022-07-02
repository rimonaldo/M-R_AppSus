export default {
	props: ['notes'],
	template: `
<section v-if="notes">
	<input placeholder="Title" v-model="title" type="text" />
	<input v-model="value" type="text" placeholder="note/ imgUrl/ videoUrl" />
	<div class="buttons">
		<button @click="chooseTxt">txt</button>
		<button @click="chooseImg">img</button>
		<button @click="chooseTodo">Todo</button>
		<button @click="chooseVideo">Video</button>
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
			this.$emit('newNote', ans)
		},
		chooseVideo() {
			this.type = 'note-video'
			let endUrl = this.value.substr(this.value.lastIndexOf('/') + 1)
			let url = `https://www.youtube.com/embed/${endUrl}`
			this.info = {url, title: this.title}
			let ans = {type: this.type, info: this.info}
			this.$emit('newNote', ans)
		},
	},
	computed: {},
	unmounted() {},
}
