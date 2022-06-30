export default {
	template: `
	<section v-if="info">
		<video id="movie" src="https://www.youtube.com/embed/mzvk0fWtCs0" height="600px" width="1300px" controls autoplay></video>
		<h2>{{info.title}}</h2>
		<button @click="deleteNote">X</button>
	</section>

`,
	props: ['info', 'note'],
	data() {
		return {
			// info: this.info,
		}
	},
	created() {
		console.log('this.info:', this.info)
		// this.info
	},
	methods: {
		deleteNote(ev) {
			let id = this.note.id
			this.$emit('deleteNote', id)
		},
	},
	computed: {
		// imgUrl() {
		// var url = this.info.url
		// return url
		// },
	},
	unmounted() {},
}
