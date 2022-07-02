import { emailService } from '../../services/email-service/email-service.js'
import { appService } from '../../services/main-app-service/main-app-service.js'

export default {
    props: ['draft'],
    template: `
    <section class="compose">
        <div class="new-email">

            <header class="header">
                <span>New Message</span>
                <div class="action-btns">
                    <div class="min-max">-</div>
                    <div class="full">^</div>
                    <div @click="$emit('close', 'close')" class="close">x</div> 
                </div>   
            </header>
       
            <div  class="inputs">
                <input placeholder="Recipiants" type="text" v-model="newEmail.to">
                <input  placeholder="Subject" type="text" v-model="newEmail.subject">
                <textarea @input="saveDraft" v-model="newEmail.body" name="" id="" cols="30" rows="10"></textarea>
            </div>
            
            <router-link :to="'/email/show/'+'inbox'">
                <div class="bottom action-btns">
                    <button @click="send" class="send">
                        <span>send</span>
                    </button>
                </div>
            </router-link>

        </div>
    </section>
`,
    data() {
        return {
            newEmail:null

        };
    },
    methods: {
        log() {

        },
        saveDraft(){
            emailService.save(emailService.SENT_KEY, this.newEmail)
        },
        send() {
            this.newEmail.status = 'sent'
            emailService.save(emailService.SENT_KEY, this.newEmail)   
            this.$emit('close');
        }
    },
    computed: {},
    created() {
        if(this.draft){
            // console.log('editing this draft:\n', this.draft);
            // this.newEmail = this.draft
        }
        this.newEmail = emailService.composeEmail()
        this.newEmail.status = "draft"
        emailService.save(emailService.SENT_KEY , this.newEmail)
        // console.log(this.newEmail);
        // this.$emit('addDraft', this.newEmail)
    },
    mounted() { },
    unmounted() { },
    components: {},
    wath:{
        draft :{
            immediate: true,
            handler(newVal,oldVal){
                console.log('watch on:\n', newVal);
            }
        }
    }
}