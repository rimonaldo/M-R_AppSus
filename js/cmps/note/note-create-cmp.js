export default {
	props: ['notes'],
	template: `
	<section v-if="notes"	>
	
			<input  placeholder="Title" v-model="title"  type="text">
		
		<input 
		v-model="value"
		type="text"
		placeholder="New Note"
		>
<div class="buttons">
	<button @click="chooseTxt">txt</button>
	<button @click="chooseImg">img</button>
	<button @click="chooseTodo">Todo</button>
	<button @click="createNote">create</button>
</div>
	</section>
`,
	data() {
		return {
			title: null,
			value: null,
			info: null,
			type: null,
		}
	},
	created() {},
	methods: {
		chooseTxt() {
			this.type = 'note-txt'
			this.info = {txt: this.value, title: this.title}
		},
		chooseImg() {
			this.type = 'note-img'
			this.info = {url: this.value, title: this.title}
		},
		chooseTodo() {
			this.type = 'note-todos'
			this.info = {
				info: {
					label: this.title,
					todos: [{txt: this.value, doneAt: new Date()}],
				},
			}
		},
		createNote() {
			let ans = {type: this.type, info: this.info}
			this.$emit('newNote', ans)
		},
	},
	computed: {},
	unmounted() {},
}
