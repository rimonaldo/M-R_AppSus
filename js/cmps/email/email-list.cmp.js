import { emailService } from '../../services/email-service/email-service.js'
import { appService } from '../../services/main-app-service/main-app-service.js'
import emailPreview from './email-preview.cmp.js'
import sentPreview from './sent-preview.cmp.js'
import emailDetails from './email-details.cmp.js'
export default {
	props: [],
	template: `
    <section class="email-list" >
        <ul  class="mail" v-if="emails">
            <li>
				<div class="btns">
					<input type="checkbox">
				</div>
			</li>
                <email-preview v-if="emails" @remove="removeEmail"
				 v-if="show.inbox" :emails="emails"/>   
				<sent-preview  v-if="show.sent" @remove="removeEmail"/>
				<email-details v-if="read" :email="read" />
        </ul>
    </section>
`,
	data() {
		return {
			emails: null,
			// sent:null,
			read: null,
			show: {
				inbox: false,
				starred: false,
				sent: false,
				drafts: false,
				trash: false
			}
		}
	},
	methods: {
		removeEmail(key,emailId) {
			console.log('email credentials', key , emailId);
			// if(key === 'sent'){
			// 	key = emailService.SENT_KEY
			// } else{
			// 	key = emailService.EMAILS_KEY
			// }
			// emailService.remove(key, emailId)
			// 	.then(() => {
			// 		const idx = this.emails.findIndex((email) => email.id === id)
			// 		this.emails.splice(idx, 1)
			// 	})
		}
	},
	computed: {},
	created() {
		appService.query(emailService.EMAILS_KEY).then((emails) => {
			this.emails = emails
		})
	},
	mounted() { },
	unmounted() { },
	components: {
		emailPreview,
		sentPreview,
		emailDetails,

	},
	watch: {
		'$route.params': {
			handler() {
				const page = this.$route.params.show
				const emailId = this.$route.params.emailId
				if (page) {
					for (let pageToShow in this.show) {
						pageToShow === page ? this.show[pageToShow] = true : this.show[pageToShow] = false
					}
				} else {
					emailService.get(emailService.EMAILS_KEY, emailId)
						.then((email) => {
							console.log(email);
							this.read = email
							console.log('this.read', this.read);
						})
				}
			},
			immediate: true,
		},

	}
}
