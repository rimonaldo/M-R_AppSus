import noteActions from '../note-actions.cmp.js'
import {eventBus} from '../../../services/main-app-service/eventBus-service.js'
export default {
	template: `
	<section v-if="info">

		<h2>{{info.title}}</h2>
		<iframe
		:src="info.url"
		width="300"
		height="200"
		style="border: 0"
		allowfullscreen=""
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"
		></iframe>
		<note-actions :key="note.id" :note="note"></note-actions>
	</section>
`,
	props: ['info', 'note'],
	components: {
		noteActions,
		eventBus,
	},
	data() {
		return {}
	},
	created() {},
	methods: {},
	computed: {},
	unmounted() {},
}
