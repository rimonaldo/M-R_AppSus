import {eventBus} from '../../services/main-app-service/eventBus-service.js'

export default {
	template: `
	<section>
		<button @click="pin">pin</button>
		<button @click="deleteNote">X</button>
		<button @click="copyNote">copy</button>
		
	<div class="pallets">
	<div class="color-input">
			<input v-model="note.style.bgc" type="color" @input="changeBgc" />
			<div class="color-icon"></div>
		</div>

		<div class="color-input">
			<input v-model="note.style.color" type="color" @input="changeBgc" />
			<div class="color-icon second"></div>
		</div>

	</div>

		<button :class="classy"@click="isPinnd" @click="pin">📌</button>
		<button @click="deleteNote">❌</button>
		<button @click="copyNote">📑</button>
		<input v-model="note.style.bgc" type="color" @input="changeBgc" />
		<input v-model="note.style.color" type="color" @input="changeColor"  class="color-input"/>
	</section>

`,
	components: {
		eventBus,
	},
	props: ['note'],
	data() {
		return {
			classy: null,
		}
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
		isPinnd() {
			console.log('this.note.isPinned:', this.note.isPinned)
			if (this.note.isPinned) this.classy = 'pined'
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
		computed: {},
	},
	unmounted() {},
}
