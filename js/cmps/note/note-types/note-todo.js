import noteTodos from './note-todos-list.js'

export default {
	template: `
 <section  v-if="info"   class="note-todo">
  <label >
    Add to do
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
         <note-todos  :idx="idx" :todo="todo"></note-todos>
										
            </li>
        </ul>
	</section>
	
	<button @click="deleteNote">X</button>
 </section>
`,
	components: {
		noteTodos,
	},
	props: ['info', 'note'],
	data() {
		return {
			todos: this.info.todos,
			value: null,
		}
	},

	created() {},

	methods: {
		deleteNote(ev) {
			let id = this.note.id
			this.$emit('deleteNote', id)
		},

		addTodo() {
			const newTodo = {txt: this.value}
			this.info.todos.push(newTodo)
		},
	},

	computed: {},

	unmounted() {},
}
