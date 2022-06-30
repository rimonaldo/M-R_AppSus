import appHeader from '../cmps/main-app/app-header.cmp.js'
import appFooter from '../cmps/main-app/app-footer.cmp.js'

export default {
	props: [],
	template: `
    <section class="main-layout">
        <app-header></app-header>
        <h1>Home-Page</h1>

        <router-link :to="'/email/show/'+'inbox'">email app</router-link>
        <br>
        <router-link to="/note">note app</router-link>
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
