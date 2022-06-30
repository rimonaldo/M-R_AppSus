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
                <email-preview @remove="removeEmail" v-if="!show.sent"/>   
				<router-view></router-view>
        </ul>
    </section>
`,
	data() {
		return {
			emails: null,
			sent:null,
			showSent:false,
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
					// this.show.forEach((show)=>{
					// 	show === false
					// })
					// this.show[page] === true

					for(let show in this.show){
						show === false
					}
					this.show[page] = true
				
				} else this.show.sent = false
			},
			
		},	
	}	
}
