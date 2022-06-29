export default {
	props: ['notes'],
	template: `
  <button @click="addTxt">Create New</button>
`,
	data() {
		return {}
	},
	created() {},
	methods: {
		addTxt() {
			this.$emit('newTxt', 'note-txt')
		},
	},
	computed: {},
	unmounted() {},
}
