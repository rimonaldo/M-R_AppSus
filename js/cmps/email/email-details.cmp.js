import {emailService} from '../../services/email-service/email-service.js'
import {appService} from '../../services/main-app-service/main-app-service.js'

export default {
    props: [],
    template: `
    <section class="preview">
  
        <h1>Details</h1>
        
        <router-link to="/email"><button>back</button></router-link>

        <ul v-if="email">
            <li>{{email.subject}}</li>
        </ul>
       
    </section>
`,
    data() {
        return {
            emails:null,
            email:null,
        };
    },
    methods: {},
    computed: {},
    created() { 
        appService.query(emailService.EMAILS_KEY).then((emails)=>{
            this.emails = emails 
        })
    },
    mounted() {
        console.log(this.$route.params.emailId);
        const id = this.$route.params.emailId
        appService.get(emailService.EMAILS_KEY, id)
            .then((email)=>{
                console.log(email);
                this.email = email
            })
     },
    unmounted() { },
    components: {
        emailService,
        appService,
        emailService,
        
    },
}