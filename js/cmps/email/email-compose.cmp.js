export default {
    props: [],
    template: `
    <section class="compose">
        <div class="new-email">
            <div class="header">
                <span>New Message</span>
                <div class="action-btns">
                    <div class="min-max">-</div>
                    <div class="full">^</div>
                    <router-link to="/email"> <div class="close">x</div> </router-link>
                    
                </div>
            </div>
        </div>

    </section>
`,
    data() {
        return {};
    },
    methods: {},
    computed: {},
    created() { },
    mounted() { },
    unmounted() { },
    components: {},
}