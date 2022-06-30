import {emailService} from '../../services/email-service/email-service.js'
import {appService} from '../../services/main-app-service/main-app-service.js'

export default {
    props: [],
    template: `
    <section class="compose">
        <div class="new-email">
            <header class="header">
                <span>New Message</span>
                <div class="action-btns">
                    <div class="min-max">-</div>
                    <div class="full">^</div>
                    <router-link to="/email"> <div class="close">x</div> </router-link>
                </div>   
            </header>

            <div class="inputs">
                <input placeholder="Recipiants" type="text">
                <input placeholder="Subject" type="text">
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>

            <div class="bottom action-btns">
                <button @click="logEmail" class="send">
                    <span>send</span>
                    <span></span>
                </button>
            </div>
        </div>

    </section>
`,
    data() {
        return {
            email:null,

        };
    },
    methods: {
        logEmail(){

        }
    },
    computed: {},
    created() { 
        appService.get(emailService.SENT_KEY)
            .then((sent)=>{
                console.log(sent);
            })
        this.mail = emailService.getNewEmail()
    },
    mounted() { },
    unmounted() { },
    components: {},
}