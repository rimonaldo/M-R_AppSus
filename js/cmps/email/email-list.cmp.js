import {emailService} from '../../services/email-service/email-service.js'
import {appService} from '../../services/main-app-service/main-app-service.js'

export default {
    props: [],
    template: `
    <section class="list">
       
        <ul v-for="email in emails" v-if="emails">
            <li>
            <div class="actions">
                <input type="checkbox">
                <input type="checkbox">
            </div>
            <router-link :to="'/email/'+email.id">
                <span >{{email.sentBy.split('@')[0]}}</span>
                <span >{{email.subject}}</span>
                <span >{{email.body}}</span>
                <span>18:06</span>
            </router-link>
        </li>
        <!-- <li >{{email.sentAt}}</li> -->
    </ul>
    <router-view></router-view>
    <router-link to="/email/id">Email</router-link> 
    </section>
`,
    data() {
        return {
            emails:null
        };
    },
    methods: {},
    computed: {
    },
    created() {
        appService.query(emailService.EMAILS_KEY).then((emails)=>{
            console.log(emails);
            this.emails = emails
            
        })

     },
    mounted() { },
    unmounted() { },
    components: {

    },
}