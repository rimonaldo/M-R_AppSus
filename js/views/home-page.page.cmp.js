import appHeader from '../cmps/main-app/app-header.cmp.js'
import appFooter from '../cmps/main-app/app-footer.cmp.js'

export default {
    props: [],
    template: `
    <app-header></app-header>
    <section class="main-layout">
        
        <h1>Home-Page</h1>

        <router-link to="/email">email app</router-link>
        <br>
        <router-link to="/keep">keep app</router-link>
    </section>
    <app-footer></app-footer>
`,
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