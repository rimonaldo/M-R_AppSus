export default {
	template: `
  <button>pin</button>
	<button @click="deleteNote">X</button>
  <!-- <button>X</button> -->
  <!-- <button></button> -->
`,
	data() {
		return {}
	},
	created() {},
	methods: {
		deleteNote(ev) {
			console.log('ev:', ev)
		},
	},
	computed: {},
	unmounted() {},
}
