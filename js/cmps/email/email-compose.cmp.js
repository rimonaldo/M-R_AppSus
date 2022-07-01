import { emailService } from '../../services/email-service/email-service.js'
import { appService } from '../../services/main-app-service/main-app-service.js'

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
                    <div @click="$emit('close')" class="close">x</div> 
                </div>   
            </header>
       
            <div  class="inputs">
                <input placeholder="Recipiants" type="text" v-model="newEmail.to">
                <input  placeholder="Subject" type="text" v-model="newEmail.subject">
                <textarea v-model="newEmail.body" name="" id="" cols="30" rows="10"></textarea>
            </div>

            <div class="bottom action-btns">
                <button @click="send" class="send">
                    <span>send</span>
                </button>
            </div>

        </div>
    </section>
`,
    data() {
        return {
            newEmail: null

        };
    },
    methods: {
        log() {

        },
        send() {
            emailService.save(emailService.SENT_KEY, this.newEmail)
                .then((email) => {
                    console.log('theres ur promise', email);
                })
            console.log('sent');
            this.$emit('close');
        }
    },
    computed: {},
    created() {
        this.newEmail = emailService.composeEmail()
        this.newEmail.status = "draft"
        emailService.save(emailService.SENT_KEY , this.newEmail)
        console.log(this.newEmail);
    },
    mounted() { },
    unmounted() { },
    components: {},
}