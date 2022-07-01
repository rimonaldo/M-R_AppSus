import { emailService } from '../../services/email-service/email-service.js'
import { appService } from '../../services/main-app-service/main-app-service.js'

export default {
	props: ['emails'],
	template: `
    <section class="preview" >
        <li  v-for="email in emails" :class="{read:email.isRead}">
            <div class="actions">
                <input  type="checkbox" v-model="email.isRead">                
				<div class="stars">
				<span @click="toggleStar(email)" :class="{checked:email.isStarred}" class="star-bottom"></span>
				<span @click="toggleStar(email)" :class="{checked:email.isStarred}" class="star"></span>
				</div>
            </div>
            <router-link :to="'/email/'+email.id">
                <span >{{email.sentBy.fullname}}</span>
                <span >{{email.subject}}</span>
                <span >{{email.body}}</span>
                <span>18:06</span>
            </router-link>
			<button @click.stop="remove(key,email.id)">x</button>
        </li>
    </section>
`,
	data() {
		return {
			key: null,
		}
	},
	methods: {
		log(log) {
			
			console.log(log);
		},
		toggleStar(email){
			email.isStarred = !email.isStarred
			emailService.saveStar(email)
		},
		remove(key, id) {
			this.$emit('remove', { key, id })
		}
	},
	computed: {},
	created() {
	},
	mounted() { },
	unmounted() { },
	components: {

	},
	watch: {
		'$route.params': {
			handler() {
				this.key = this.$route.params.show
				console.log('key is',this.key);
			},
			immediate: true
		}
	}
}
