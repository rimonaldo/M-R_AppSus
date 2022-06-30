import { emailService } from '../../services/email-service/email-service.js'
import { appService } from '../../services/main-app-service/main-app-service.js'

export default {
	props: ['emails'],
	template: `
    <section class="preview" >
        <li  v-for="email in emails" :class="{read:email.isRead}">
            <div class="actions">
                <input  type="checkbox" v-model="email.isRead">
                <input @click="log" :class="{star:email.isStarred}" type="checkbox" >
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
		log() {
			console.log(this.email);
		},
		remove(key, emailId) {
			this.$emit('remove', { key, emailId })
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
