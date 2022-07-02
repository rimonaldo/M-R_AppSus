export default {
	props: [],
	template: `
    <section class="side-menu">
        
        <router-link :to="'/email/show/'+'inbox'">
            <div class="inbox">
                <span>inbox</span>  
            </div>
        </router-link>
        
        <router-link :to="'/email/show/'+'starred'">
            <div class="starred">
                <span>Starred</span>
            </div>
        </router-link>
        
        <router-link :to="'/email/show/'+'sent'">
            <div class="sent">
                <span>Sent</span>
            </div>
        </router-link>
        
        <router-link :to="'/email/show/'+'draft'">
            <div class="draft">
                <span>Drafts</span>
            </div>
        </router-link>
        
        <router-link :to="'/email/show/'+'note'">
            <div class="notes">
            <router-link to="/note">Notes</router-link>
            </div>
        </router-link>
        
        <router-link :to="'/email/show/'+'trash'">
            <div class="trash">
                <span>Trash</span>
            </div>
        </router-link>
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
	components: {},
}
