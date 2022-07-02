import { emailService } from '../../services/email-service/email-service.js'
import { appService } from '../../services/main-app-service/main-app-service.js'
import emailPreview from './email-preview.cmp.js'
import sentPreview from './sent-preview.cmp.js'
import emailDetails from './email-details.cmp.js'
import starPreview from './star-preview.cmp.js'
import draftPreview from './draft-preview.cmp.js'
import trashPreview from './trash-preview.cmp.js'
import emailCompose from './email-compose.cmp.js'

export default {
	props: ['draftToAdd', 'test'],
	template: `
    <section class="email-list" >
        <ul v-if="emailsToShow" class="mail">
            <li>
				<div class="btns">
					<input type="checkbox" @click="toggleSelectAll">
				</div>
			</li>

			<email-preview v-if="emailsToShow" @remove="removeEmail"
			v-if="show.inbox" :emails="emailsToShow"/>   
			<star-preview v-if="show.starred" @remove="removeEmail"/>
			<sent-preview  v-if="show.sent" @remove="removeEmail"/>
			<draft-preview  v-if="show.draft" @remove="removeEmail"
			:draftToAdd="draftToAdd"/>
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
			isDraftEdit: false,
			draftToEdit: null,
			draftToAdd: null,
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
		toggleSelectAll() {

			var emailsToSelect = []
			// if (this.show.starred) {
			// 	console.log('stars');
			// 	var allEmails = ['inbox', 'sent']
			// 	allEmails.forEach((type)=>{
			// 		emailService.query(type)
			// 			.then((emails)=>{
			// 				emails.filter((email)=>{
			// 					if(email.isStarred){
			// 						emailsToSelect.push(email)
			// 						email.isSelected = true
			// 					}
			// 				})
			// 			})
			// 	})
			// }

			const page = this.$route.params.show
			emailService.query(page)
				.then((emails) => {
					emails.forEach((email) => {
						email.isSelected = !email.isSelected
						console.log(email.isSelected);
					})
				})

			// console.log('this.emailsToShow\n',this.emailsToShow);
			this.emailsToShow.forEach((email) => {
				email.isSelected = !email.isSelected
				// console.log(email);
			})

		},
		readEmailById(emailId) {
			emailService.get(this.key, emailId)
				.then((email) => {
					// console.log('email', email)
					this.read = email
				})
		},
		addDraft() {
			// console.log('draft added!');
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
			} 
			else {
				// console.log('email is deleted', email);
				emailService.save(emailService.TRASH_KEY, email)
					.then(() => {
						// console.log('deleted credentials:\n', key, id);
						emailService.remove(key, id)
					})
				email.status = 'trash'
			}
		},
		closeCompose(status) {
			console.log(status);
			this.isDraftEdit = false
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
		trashPreview,
		emailCompose,

	},
	watch: {
		'$route.params': {
			handler() {
				this.page = this.$route.params.show
				const page = this.page
				const emailId = this.$route.params.emailId
				// console.log('this is page:\n', this.$route.params);


				if (page && page !== 'read') {
					emailService.query(page)
						.then((emails) => {
							console.log('the page is', page);
							this.emailsToShow = emails
							// console.log('this.emailsToShow\n', this.emailsToShow);
						})

					this.read = null
					this.key = this.$route.params.show
					for (let pageToShow in this.show) {
						pageToShow === page ? this.show[pageToShow] = true : this.show[pageToShow] = false
					}
					this.$emit('dontRead')
				}
				else {
					let keys = ['inbox', 'sent']
					keys.forEach((key) => {
						emailService.get(key, emailId)
							.then((email) => {
								if (email) {
									this.read = email
								}
							})
					})

				}
			},
			immediate: true,
		},

		draftToAdd: {
			// the callback will be called immediately after the start of the observation
			immediate: true,
			handler(draft, oldVal) {
				// do your stuff
				// console.log('proptest', this.test);
				// console.log('val of draft is : \n', this.draftToAdd);
				// this.draftToAdd = draft
			}
		}

	}
}
