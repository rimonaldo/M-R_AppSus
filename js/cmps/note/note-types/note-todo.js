import noteTodos from './note-todos-list.js'
import {eventBus} from '../../../services/main-app-service/eventBus-service.js'
import noteActions from '../note-actions.cmp.js'

export default {
	template: `
 <section  v-if="info"   class="note-todo">
  <label >
		My Todos
    <input 
    v-model="value"
		type="text" 
		:placeholder="info.label"> 
    
  </label>
	<button @click="addTodo">Add</button>
	<section   v-if="note" class="Todos">
		<ul>
			<li 
						v-for="(todo,idx) in todos" 
						:key="note.id"
						  >
							<note-todos  
							:idx="idx"
				  :todo="todo"
					:id="note.id"
					></note-todos>
					
				</li>
			</ul>
		</section>
		
		<note-actions :key="note.id"  :note="note"></note-actions>
	
 </section>
`,
	components: {
		noteTodos,
		noteActions,
	},
	props: ['info', 'note'],
	data() {
		return {
			todos: null,
			value: null,
		}
	},

	created() {
		this.todos = this.info.todos
	},

	methods: {
		addTodo() {
			const id = this.note.id
			const newTodo = {txt: this.value, id}
			newTodo.id = id
			eventBus.emit('addTodo', newTodo)
		},
	},

	computed: {},
	mounted() {},

	unmounted() {},
}
