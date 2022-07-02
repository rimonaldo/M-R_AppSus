import {eventBus} from '../../services/main-app-service/eventBus-service.js'

export default {
	props: [],
	template: `
  <section  class="header ">
    
          <div class="search">
              <input @input="setFilter" v-model="filterBy.title" type="serach">
              <div class="icon"></div>
          </div>
          <div class="side-actions">
              <div class="about"></div>
              <div class="settings"></div>
              <div class="integration"></div>
          </div>
      <router-link to="/">
          home
      </router-link>
  </section>
`,
	data() {
		return {
			filterBy: {
				title: '',
			},
		}
	},
	methods: {
		setFilter() {
			eventBus.emit('setFilter', this.filterBy)
		},
	},
	computed: {},
	created() {},
	mounted() {},
	unmounted() {},
	components: {},
}
