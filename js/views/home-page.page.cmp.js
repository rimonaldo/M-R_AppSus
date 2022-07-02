import appHeader from '../cmps/main-app/app-header.cmp.js'
import appFooter from '../cmps/main-app/app-footer.cmp.js'

export default {
	props: [],
	template: `
    <section class="main-layout">
		<app-header></app-header>
      <div class="hero-container">
		<div class="hero">
			Make <span> your</span> life easier,
			let

			
			<div class="second">carry you</div>
		</div>
		<img class="hero-img" src="../../graphics/images/logo.png" >

		<div class="links">
			<router-link class="link-email" :to="'/email/show/'+'inbox'">email app</router-link>

			<router-link class="link-note" to="/note">note app</router-link>
		</div>
       
	  </div>
    </section>
  
    
`,
	data() {
		return {}
	},
	methods: {},
	computed: {},
	created() {},
	mounted() {},
	unmounted() {},
	components: {
		appHeader,
		appFooter,
	},
}
