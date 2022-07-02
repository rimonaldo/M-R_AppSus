import {eventBus} from '../../services/main-app-service/eventBus-service.js'

export default {
	template: `
	<section>
		<button @click="pin">pin</button>
		<button @click="deleteNote">X</button>
		<button @click="copyNote">copy</button>
		<input v-model="note.style.bgc" type="color" @input="changeBgc" />
		<input v-model="note.style.color" type="color" @input="changeColor" />
	</section>

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
			eventBus.emit('bgcNote', id)
		},
		changeColor() {
			let id = this.note.id
			eventBus.emit('txtColorNote', id)
		},
		copyNote() {
			let id = this.note.id
			eventBus.emit('copyNote', id)
		},
	},
	unmounted() {},
}
