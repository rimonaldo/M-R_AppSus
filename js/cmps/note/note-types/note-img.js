import noteActions from '../note-actions.cmp.js'
import {eventBus} from '../../../services/main-app-service/eventBus-service.js'

export default {
	template: `
			<section v-if="info">
				<img  class="note-photo" :src="imgUrl"  />
				<h2>{{info.title}}</h2>
				
				<note-actions :key="note.id"  :note="note"></note-actions>
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
	methods: {},
	computed: {
		imgUrl() {
			var url = this.info.url
			return url
		},
	},
	created() {},
}
