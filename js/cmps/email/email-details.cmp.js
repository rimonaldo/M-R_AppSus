import { emailService } from '../../services/email-service/email-service.js'


export default {
    props: ['email'],
    template: `
    <section class="details" >
       <div class="details-preview">

        <!-- <router-link :to="'/email/show/'+'inbox'"><button>back</button></router-link> -->
        <div v-if="email">
            <div class="subject">{{email.subject}}</div>
            <br>
            <div class="info">
                <span class ="sender-fname">{{email.sentBy.fullname}}</span>
                <span class ="sender-email">{{email.sentBy.email}}</span>
            </div>
            <div class="body">{{email.body}}</div>
            <div class="action-btns">
                <button class="replay"> <span class="reply"></span> Reply</button>
                <button class=""><span class ="forward"></span>Forward</button>
            </div>
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