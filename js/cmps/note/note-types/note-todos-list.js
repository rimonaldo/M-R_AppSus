import {eventBus} from '../../../services/main-app-service/eventBus-service.js'
export default {
	template: `
	
	<div  v-if="todo">
		<input type="text"
		v-model="val"
		:placeholder="displayTodo">
<!-- {{displayTodo}} -->
<div class="buttons">

	<button @click="doneTodo">Done</button>
	<button @click="changeTodo">Change</button>
</div>
</div>
`,

	props: ['todo', 'idx', 'id'],
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
