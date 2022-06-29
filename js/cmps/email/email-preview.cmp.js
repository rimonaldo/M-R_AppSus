import {emailService} from '../../services/email-service/email-service.js'
import {appService} from '../../services/main-app-service/main-app-service.js'

export default {
	props: ['email'],
	template: `
    <section class="preview">
  
        <h1>preview</h1>
        
        <router-link to="/email"><button>back</button></router-link>
       
    </section>
`,
	data() {
		return {
			emails: null,
		}
	},
	methods: {},
	computed: {},
	created() {
		appService.query(emailService.EMAILS_KEY).then((emails) => {
			this.emails = emails
		})
	},
	mounted() {},
	unmounted() {},
	components: {
		emailService,
		appService,
		emailService,
	},
}
