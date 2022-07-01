import {eventBus} from '../../services/main-app-service/eventBus-service.js'

export default {
	template: `
  <button @click="pin">pin</button>
	<button @click="deleteNote">X</button>
<input 
v-model="note.style.bgc" 
type="color"
@input="changeBgc"
> 
<!-- <button @click="changeBgc">save</button> -->
`,
	computed: {
		eventBus,
	},
	props: ['note'],
	data() {
		return {}
	},
	created() {},
	methods: {
		deleteNote(ev) {
			let id = this.note.id
			eventBus.emit('deleteNote', id)
		},

		pin() {
			let id = this.note.id
			eventBus.emit('pinTodo', id)
		},

		changeBgc() {
			let id = this.note.id
			console.log('this.note.id:', this.note.id)
			eventBus.emit('bgcNote', id)
		},
	},
	unmounted() {},
}
