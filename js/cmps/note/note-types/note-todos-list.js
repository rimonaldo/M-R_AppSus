import {eventBus} from '../../../services/main-app-service/eventBus-service.js'
export default {
	template: `
<div v-if="todo">
	<input
		v-if="	note"
 type="text"
  v-model="val" 
	:placeholder="displayTodo"
	:style="{backgroundColor:note.style.bgc }"
	 />
	<div class="buttons">
		<button @click="doneTodo">❌</button>
		<button @click="changeTodo">🗃️</button>
	</div>
</div>
`,

	props: ['todo', 'idx', 'id', 'note'],
	data() {
		return {
			val: null,
		}
	},
	created() {},

	methods: {
		doneTodo(ev) {
			const obj = {id: this.id, idx: this.idx}
			eventBus.emit('doneTodo', obj)
		},
		changeTodo(ev) {
			const obj = {id: this.id, idx: this.idx, txt: this.val}
			eventBus.emit('changeTodo', obj)
		},
	},

	computed: {
		displayTodo() {
			return this.todo.txt
		},
	},
	unmounted() {},
}
