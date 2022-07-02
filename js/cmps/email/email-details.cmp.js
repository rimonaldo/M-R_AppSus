import { emailService } from '../../services/email-service/email-service.js'


export default {
    props: ['email'],
    template: `
    <section class="details" >
        <h1>Details</h1>    
        <router-link :to="'/email/show/'+'inbox'"><button>back</button></router-link>
        <div v-if="email">
            <div class="subject">{{email.subject}}</div>
            <span>{{email.sentBy.fullname}}</span>
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

        };
    },
    methods: {},
    computed: {},
    created() {

    },
    mounted() {},
    unmounted() { },
    components: {

    },
}