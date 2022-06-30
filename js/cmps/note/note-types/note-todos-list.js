import {eventBus} from '../../../services/main-app-service/eventBus-service.js'
export default {
	template: `
	<div  v-if="todo">
{{displayTodo}}
<button @click="doneTodo">Done</button>
</div>
`,

	props: ['todo', 'idx', 'id'],
	data() {
		return {}
	},
	created() {},

	methods: {
		doneTodo(ev) {
			const obj = {id: this.id, idx: this.idx}
			eventBus.emit('doneTodo', obj)
		},
	},

	computed: {
		displayTodo() {
			return this.todo.txt
		},
	},
	unmounted() {},
}
