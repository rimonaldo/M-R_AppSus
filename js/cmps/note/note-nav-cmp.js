export default {
	props: [],
	template: `
  <section  class="header email-nav">
      <button class="open-side"></button>
          <div class="search">
              <input type="serach">
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
		return {}
	},
	methods: {},
	computed: {},
	created() {},
	mounted() {
		this.email = true
	},
	unmounted() {
		this.email = false
	},
	components: {},
}
