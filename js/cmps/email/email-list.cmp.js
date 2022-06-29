import {emailService} from '../../services/email-service/email-service.js'
import {appService} from '../../services/main-app-service/main-app-service.js'
import emailPreview from './email-preview.cmp.js'

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
                <email-preview/>          
        </ul>
    <router-view></router-view>
    </section>
`,
	data() {
		return {
			emails: null,
		}
	},
	methods: {},
	computed: {},
	created() {
		appService.query(emailService.EMAILS_KEY).then((emails) => {
			this.emails = emails
		})
	},
	mounted() {},
	unmounted() {},
	components: {
        emailPreview
    },
}
