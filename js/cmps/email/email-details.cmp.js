import { emailService } from '../../services/email-service/email-service.js'


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
            key:null,
        };
    },
    methods: {},
    computed: {},
    created() {

    },
    mounted() {
        console.log(this.$route.params.emailId);
        const id = this.$route.params.emailId
        emailService.get('inbox', id)
            .then(email => { this.email = email })
    },
    unmounted() { },
    components: {

    },
}