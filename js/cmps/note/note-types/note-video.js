export default {
	template: `
	<section v-if="info">
	<iframe
			width="336"
			height="189"
			src="https://www.youtube.com/embed/hFFopPPrGiE"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</section>

`,
	props: ['info', 'note'],
	data() {
		return {}
	},
	created() {},
	methods: {},
	computed: {},
	unmounted() {},
}
