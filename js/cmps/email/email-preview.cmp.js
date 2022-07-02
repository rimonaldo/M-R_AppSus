import { emailService } from '../../services/email-service/email-service.js'
import { appService } from '../../services/main-app-service/main-app-service.js'
import emailCompose from './email-compose.cmp.js'

export default {
	props: ['emails', 'class'],
	template: `
    <section class="preview" >
        <li  v-for="email in emails" @click="editDraft"
		:class="[{selected:email.isSelected},{drafts:email.status === 'draft'},
		{trashed:email.status === 'trash'},{trashed:email.isTrashed}]">

            <div class="actions" >
                <input  type="checkbox" v-model="email.isSelected">                
				<div class="stars" :class="{hide:email.status === 'trash'}">
				<!-- <div class="stars"> -->
					<span @click="toggleStar(email)" :class="{checked:email.isStarred}" class="star-bottom"></span>
					<span @click="toggleStar(email)" :class="{checked:email.isStarred}" class="star"></span>
				</div>
            </div>
			<!-- +email.id -->
            <router-link :to="'/email/show/'+'read/'+email.id">
                <span >{{email.sentBy.fullname}}</span>
                <span >{{email.subject}}</span>
                <span >{{email.body}}</span>
                <span>18:06</span>
            </router-link>
			<button @click.stop="remove(email)">x</button>
        </li>
    </section>
`,
	data() {
		return {
			key: null,
			isEditDraft:false,

		}
	},
	methods: {
		log(log) {

			console.log(log);
		},
		editDraft(){
			
		},

		toggleStar(email) {
			email.status = this.key
			email.isStarred = !email.isStarred
			emailService.save(this.key, email).then()

		},
		remove(email) {
			this.$emit('remove', email)
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
			},
			immediate: true
		}
	}
}
