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
			key:'inbox',
			emails: null,
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
		removeEmail(email) {
			const { key, id } = email
			let emails = ''
			emailService.query((key))
				.then((emailsPrm) => { emails = emailsPrm })
				.then(()=>{

					emailService.remove(key, id)
						.then(() => {
							const idx = emails.findIndex((email) => email.id === id)
							this.emails.splice(idx, 1)
						})
				})

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
					this.key = this.$route.params.show
					for (let pageToShow in this.show) {
						pageToShow === page ? this.show[pageToShow] = true : this.show[pageToShow] = false
					}
				} else {
					emailService.get(this.key, emailId)
						.then((email) => {
							console.log('email',email);
							this.read = email
						})
				}
			},
			immediate: true,
		},

	}
}
