import { emailService } from '../../services/email-service/email-service.js'
import { appService } from '../../services/main-app-service/main-app-service.js'
import emailPreview from './email-preview.cmp.js'
import sentPreview from './sent-preview.cmp.js'
import emailDetails from './email-details.cmp.js'
import starPreview from './star-preview.cmp.js'
import draftPreview from './draft-preview.cmp.js'
import trashPreview from './trash-preview.cmp.js'

export default {
	props: [],
	template: `
    <section class="email-list" >
        <ul v-if="emails" class="mail">
            <li>
				<div class="btns">
					<input type="checkbox">
				</div>
			</li>

                <email-preview v-if="emails" @remove="removeEmail"
				v-if="show.inbox" :emails="emails"/>   
				<star-preview v-if="show.starred" @remove="removeEmail"/>
				<sent-preview  v-if="show.sent" @remove="removeEmail"/>
				<draft-preview  v-if="show.draft" @remove="removeEmail"/>
				<trash-preview  v-if="show.trash" />
				<email-details v-if="read" :email="read" />
        </ul>
    </section>
`,
	data() {
		return {
			key:'inbox',
			emails: [],
			read: null,
			show: {
				inbox: false,
				starred: false,
				sent: false,
				draft: false,
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
					emailService.get(key,id)
						.then((email)=>{
							email.status = 'trash'
							console.log(email);
							const idx = emails.findIndex((email) => email.id === id)
							this.emails.splice(idx, 1)
							emailService.save('inbox',email)
						})
					// emailService.remove(key, id)
					// 	.then(() => {
					// 		const idx = emails.findIndex((email) => email.id === id)
					// 		this.emails.splice(idx, 1)
					// 	})
				})

		}
	},
	computed: {},
	created() {
		appService.query(emailService.EMAILS_KEY)
			.then((emails) => {
				console.log(emails);
				emails.filter((email)=>{
					if(email.status !== 'trash'){
						this.emails.push(email)
					}
				})
				this.emails = emails
			})
	},
	mounted() { },
	unmounted() { },
	components: {
		emailPreview,
		sentPreview,
		emailDetails,
		starPreview,
		draftPreview,
		trashPreview
		
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
