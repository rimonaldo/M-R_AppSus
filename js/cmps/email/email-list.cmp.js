import {emailService} from '../../services/email-service/email-service.js'
import {appService} from '../../services/main-app-service/main-app-service.js'
import emailPreview from './email-preview.cmp.js'
import sentPreview from './sent-preview.cmp.js'

export default {
	props: [],
	template: `
    <section class="list" >
        <ul  class="mail" v-if="emails">
            <li>
				<div class="btns">
					<input type="checkbox">
				</div>
			</li>
                <email-preview v-if="emails" @remove="removeEmail" v-if="show.inbox" :emails="emails"/>   
				<sent-preview  v-if="show.sent"></sent-preview>
        </ul>
    </section>
`,
	data() {
		return {
			emails: null,
			sent:null,
			show:{
				inbox:false,
				starred:false,
				sent:false,
				drafts:false,
				trash:false
			}
		}
	},
	methods: {
		removeEmail(id){
			emailService.remove(emailService.EMAILS_KEY,id)
				.then(()=>{
					const idx = this.emails.findIndex((email)=> email.id === id)
					this.emails.splice(idx,1)	
				})
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
        emailPreview,
		sentPreview
    },
	watch: {
		'$route.params': {
			handler() {	
				if (this.$route.params.show){
					const page = this.$route.params.show
					for(let show in this.show){
						show === page ? this.show[show] = true : this.show[show] = false 
					}
				} 
			},
			immediate: true
			
		},	
	}	
}
