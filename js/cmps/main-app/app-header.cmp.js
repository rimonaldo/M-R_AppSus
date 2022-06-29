import emailNav from "../../cmps/email/email-nav.cmp.js";

export default {
    props: [],
    template: `
    <section class="header">
        <h1>header</h1>
        <router-link to="/">home</router-link>

    </section>
`,
    data() {
        return {
            email:false,
            note: false,
        };
    },
    methods: {
       
    },
    computed: {},
    created() { },
    mounted() { },
    unmounted() { },
    components: {
        emailNav
    },
}