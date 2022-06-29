import { emailService } from '../../services/email-service/email-service.js'
import { appService } from '../../services/main-app-service/main-app-service.js'

export default {
    props: [],
    template: `
    <section class="details" >
        <h1>Details</h1>    
        <router-link to="/email"><button>back</button></router-link>
        <div v-if="email">
            <div class="subject">{{email.subject}}</div>
            <span>{{email.sentBy}}</span>
            <div class="body">{{email.body}}</div>
            <div class="action-btns">
                <button class="replay">Reply</button>
                <button class="forward">Forward</button>
            </div>
        </div>
       
    </section>
`,
    data() {
        return {
            email: null,
        };
    },
    methods: {},
    computed: {},
    created() {

    },
    mounted() {
        console.log(this.$route.params.emailId);
        const id = this.$route.params.emailId
        appService.get(emailService.EMAILS_KEY, id)
            .then(email => { this.email = email })
    },
    unmounted() { },
    components: {

    },
}