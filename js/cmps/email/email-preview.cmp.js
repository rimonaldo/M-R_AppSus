import { emailService } from '../../services/email-service/email-service.js'
import { appService } from '../../services/main-app-service/main-app-service.js'
import emailCompose from './email-compose.cmp.js'
import {eventBus} from '../../services/main-app-service/eventBus-service.js'

export default {
	props: ['emails', 'class'],
	template: `
    <section class="preview" >
		
		<li  v-for="email in emails" @click="editDraft"
		:class="[{select:email.isSelected},{drafts:email.status === 'draft'},
		{trashed:email.status === 'trash'},{trashed:email.isTrashed},]">

		<div class="actions" >
			<input  type="checkbox" v-model="email.isSelected" >                
			<div class="stars" :class="{hide:email.status === 'trash'}
			,{hide:email.status === 'draft'}">
			<span @click="toggleStar(email)" :class="{checked:email.isStarred}" class="star-bottom"></span>
			<span @click="toggleStar(email)" :class="{checked:email.isStarred}" class="star"></span>
				</div>
            </div>
			<!-- +email.id -->
				<router-link :class="{unread:email.isUnread}" @click.stop="readEmail(email)" v-if="" :to="'/email/show/'+'read/'+email.id">

						
						<span  >{{email.sentBy.fullname}}</span>
						<span >{{email.subject}}</span>
						<span >{{email.body}}</span>
						<span>18:06</span>
	
				</router-link>
			</div>
			<button v-if="isTrash" @click.stop="recycle(email)">v</button> |
			<button @click.stop="remove(email)">x</button>
        </li>

		
    </section>
`,
	data() {
		return {
			key: null,
			isEditDraft: false,
			isTrash: false,
		}
	},
	methods: {
		log(log) {

			console.log(log);
		},
		editDraft() {

		},
		readEmail(email) {
			console.log(email);
			email.isUnread = false
			console.log(email);
			appService.save('inbox', email)
		},
		toggleStar(email) {
			email.status = this.key
			email.isStarred = !email.isStarred
			appService.save(email.status, email)
		},
		remove(email) {
			this.$emit('remove', email)
		},
		recycle(email) {
			let key = 'sent'
			let id = email.id
			if (email.status !== 'trash') return
		 
				emailService.query(emailService.TRASH_KEY)
				.then((emails) => {
					email.isTrash = false
					this.$emit('recycle' , email)
					emailService.remove(emailService.TRASH_KEY, email)
					})
			
			if (email.sentBy.email !== emailService.loggedinUser.email) {
				key = 'inbox'
			}
			
			emailService.query(key)
				.then((emails) => {
					emails.push(email)
					emailService.save(key, email)
					email.id = null
					email.status = key
					emailService.save(key, email)
				})
			

		}
	},
	computed: {},
	created() {
		console.log(this.class);
	},
	mounted() {
	},
	unmounted() { },
	components: {
		emailCompose,

	},
	watch: {
		'$route.params': {
			handler() {
				this.key = this.$route.params.show
				console.log('key is', this.key);
				if (this.key === 'trash') {
					this.isTrash = true
				}
			},
			immediate: true
		}
	}
}
