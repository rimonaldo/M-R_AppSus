export default {
    props: [],
    template: `
    <section class="side-menu">
        
        <router-link to="/email">
        <div class="inbox">
            <span>inbox</span>
            
        </div>
        </router-link>
        
        <div class="starred">
            <span>Starred</span>
        </div>
        
        <router-link :to="'/email/show/'+'sent'">
        <div class="sent">
            <span>Sent</span>
        </div>
        </router-link>
        
        <div class="drafts">
            <span>Drafts</span>
        </div>
        
        <div class="notes">
            <span>Notes</span>            
        </div>
        
        <div class="trash">
            <span>Trash</span>
        </div>
    </section>
`,
    data() {
        return {

        };
    },
    methods: {},
    computed: {},
    created() { },
    mounted() { },
    unmounted() { },
    components: {},
}