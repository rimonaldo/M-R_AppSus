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
        <ul v-if="emailsToShow" class="mail">
            <li>
				<div class="btns">
					<input type="checkbox">
				</div>
			</li>

                <email-preview v-if="emailsToShow" @remove="removeEmail"
				v-if="show.inbox" :emails="emailsToShow"/>   
				<star-preview v-if="show.starred" @remove="removeEmail"/>
				<sent-preview  v-if="show.sent" @remove="removeEmail"/>
				<draft-preview  v-if="show.draft" @remove="removeEmail"/>
				<trash-preview  v-if="show.trash" @remove="removeEmail"/>
				<email-details v-if="read" :email="read" />
        </ul>
    </section>
`,
	data() {
		return {
			key: 'inbox',
			emailsToShow: [],
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
		readEmailById(emailId) {
			emailService.get(this.key, emailId)
				.then((email) => {
					console.log('email', email)
					this.read = email
				})
		},
		removeEmail(email) {
			const key = email.status
			const id = email.id
			const idx = this.emailsToShow.findIndex((email) => email.id === id)
			this.emailsToShow.splice(idx, 1)
			// id = null for save
			email.id = null
			if (email.status === 'trash') {
				emailService.query(emailService.TRASH_KEY)
					.then(() => {
						emailService.remove(emailService.TRASH_KEY, email)
					})
			} else {
				console.log('email is deleted', email);
				emailService.save(emailService.TRASH_KEY, email)
					.then(() => {
						console.log('deleted credentials:\n', key, id);
						emailService.remove(key, id)
					})
				email.status = 'trash'
			}

		}
	},
	computed: {},
	created() {
		emailService.query(emailService.EMAILS_KEY)
			.then((emails) => {
				emails.filter((email) => {
					if (email.status === 'inbox') {
						this.emailsToShow.push(email)
					}
				})
				this.emailsToShow = emails
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
				this.page = this.$route.params.show
				const page = this.$route.params.show
				const emailId = this.$route.params.emailId
				if (page) {
					this.key = this.$route.params.show
					for (let pageToShow in this.show) {
						pageToShow === page ? this.show[pageToShow] = true : this.show[pageToShow] = false
					}
				} else {
					this.readEmailById(emailId)
				}
			},
			immediate: true,
		},

	}
}
