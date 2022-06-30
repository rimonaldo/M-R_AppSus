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
                <email-preview @remove="removeEmail"/>   
				
				<sent-preview ></sent-preview>
        </ul>
    <router-view></router-view>
    </section>
`,
	data() {
		return {
			emails: null,
			sent:null,
		}
	},
	methods: {
		removeEmail(id){
			emailService.remove(emailService.EMAILS_KEY,id)
				.then(()=>{
					console.log('deleted');
					const idx = this.emails.findIndex((email)=> email.id === id)
					this.emails = this.emails.splice(idx,1)
					
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
	
}
