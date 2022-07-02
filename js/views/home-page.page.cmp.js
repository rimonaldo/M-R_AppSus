import appHeader from '../cmps/main-app/app-header.cmp.js'
import appFooter from '../cmps/main-app/app-footer.cmp.js'

export default {
	props: [],
	template: `
    <section class="main-layout">
		<app-header></app-header>
      <div class="hero-container">
        <h1>Home-Page</h1>
		<div class="hero">
			Make <span> your</span> life easier,
			let

			
			<div class="second">carry you</div>
		</div>
		<img class="hero-img" src="../../graphics/images/logo.png" >
        <router-link :to="'/email/show/'+'inbox'">email app</router-link>
        <br>
        <router-link to="/note">note app</router-link>
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
