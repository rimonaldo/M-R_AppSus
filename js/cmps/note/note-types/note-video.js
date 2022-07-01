import noteActions from '../note-actions.cmp.js'
export default {
	template: `
	<section v-if="info">
	<iframe
			width="336"
			height="189"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			:src="info.url"
			></iframe>

		<note-actions  :note="note"></note-actions>
	</section>

`,
	components: {
		noteActions,
	},
	props: ['info', 'note'],
	data() {
		return {}
	},
	created() {},
	methods: {},
	computed: {},
	unmounted() {},
}
