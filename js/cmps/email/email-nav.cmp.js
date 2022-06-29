export default {
    props: [],
    template: `
    <section v-if="email" class="header email-nav">
        <h1>email-nav</h1>
        <router-link to="/">
            home
        </router-link>
    </section>
`,
    data() {
        return {
            email:false
        };
    },
    methods: {},
    computed: {},
    created() { },
    mounted() {
        this.email = true
     },
    unmounted() {
        this.email = false
     },
    components: {},
}