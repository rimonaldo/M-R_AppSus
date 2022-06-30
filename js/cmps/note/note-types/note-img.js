import noteActions from '../note-actions.cmp.js'

export default {
	template: `
			<section \>
											<img  class="note-photo" :src="imgUrl"  />
											<h2>{{info.title}}</h2>
<button @click="deleteNote">X</button>


			</section>
			`,
	props: ['info', 'note'],
	components: {
		noteActions,
	},
	data() {
		return {}
	},
	methods: {
		deleteNote(ev) {
			let id = this.note.id
			this.$emit('deleteNote', id)
		},
	},
	computed: {
		imgUrl() {
			var url = this.info.url
			return url
		},
	},
	created() {},
}
