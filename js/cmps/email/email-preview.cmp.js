import {emailService} from '../../services/email-service/email-service.js'
import {appService} from '../../services/main-app-service/main-app-service.js'

export default {
	props: ['email'],
	template: `
    <section class="preview" >
  
        <li  v-for="email in emails" :class="{read:email.isRead}">
            <div class="actions">
                <input  type="checkbox" v-model="email.isRead">
                <input type="checkbox">
            </div>
            <router-link :to="'/email/'+email.id">
                <span >{{email.sentBy}}</span>
                <span >{{email.subject}}</span>
                <span >{{email.body}}</span>
                <span>18:06</span>
            </router-link>
        </li>
    </section>
`,
	data() {
		return {
			emails: null,
		}
	},
	methods: {
		log(){

		}
	},
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
