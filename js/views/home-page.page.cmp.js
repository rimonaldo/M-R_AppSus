import appHeader from '../cmps/main-app/app-header.cmp.js'
import appFooter from '../cmps/main-app/app-footer.cmp.js'

export default {
<<<<<<< HEAD
	props: [],
	template: `
=======
    props: [],
    template: `
    <app-header></app-header>
>>>>>>> 4bdf71036c2794e1ce9d07083d63fb4e8d9ce0b6
    <section class="main-layout">
        
        <h1>Home-Page</h1>

        <router-link to="/email">email app</router-link>
        <br>
        <router-link to="/note">note app</router-link>
    </section>
    <app-footer></app-footer>
`,
<<<<<<< HEAD
	data() {
		return {}
	},
	methods: {},
	computed: {},
	created() {},
	mounted() {},
	unmounted() {},
	components: {},
}
=======
    data() {
        return {};
    },
    methods: {},
    computed: {},
    created() { },
    mounted() { },
    unmounted() { },
    components: {
        appHeader,
        appFooter
    },
}
>>>>>>> 4bdf71036c2794e1ce9d07083d63fb4e8d9ce0b6
