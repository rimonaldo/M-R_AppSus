export default {
	props: [],
	template: `
<section class="note-txt">
<p>text note</p>
<textarea :style="{height:textareaHight +'px' }" placeholder=" type" required  @keyup="reSize"></textarea>
</section>
`,
	data() {
		return {
			textareaHight: null,
		}
	},
	methods: {
		reSize(ev) {
			console.log('ev.target:', ev.target)
			this.textareaHight = ev.target.scrollHeight
		},
	},
	computed: {},
	created() {},
	mounted() {},
	unmounted() {},
	components: {},
}
