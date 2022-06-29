export default {
    props: [],
    template: `
    <section v-if="email" class="header email-nav">
        <!-- <h1>email-nav</h1> -->
        <button class="open-side">sidemenu</button>
        <div class="logo">logo</div>
            <div class="search">
                <input type="serach">
                <div class="icon">icon</div>
            </div>
            <div class="side-actions">
                <div class="about">about</div>
                <div class="settings">settings</div>
                <div class="integration">integration</div>
            </div>
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