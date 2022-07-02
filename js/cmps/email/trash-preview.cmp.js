import emailPreview from "./email-preview.cmp.js";
import { emailService } from "../../services/email-service/email-service.js";
import {eventBus} from '../../services/main-app-service/eventBus-service.js'
export default {
    props: [],
    template: `
    <email-preview v-if="emailsToShow" :emails="emailsToShow" 
    :class="'trashed'" @remove="removeEmail" @recycle="recycle"/>
`,
    data() {
        return {
            emailsToShow: [],

        };
    },
    methods: {
        removeEmail(email) {
            const id = email.id
            const idx = this.emailsToShow.findIndex((email) => email.id === id)
            this.emailsToShow.splice(idx, 1)
            this.$emit('remove', email)
        },
        recycle(email){
            console.log('recycle' , email);
            emailService.query(emailService.TRASH_KEY)
                .then((emails)=>{
                    const id = email.id
                    const idx = emails.findIndex((email) => email.id === id)
					emails.splice(idx, 1)
                    this.emailsToShow = emails
                })
            
        }
    },
    computed: {},
    created() {

        emailService.query((emailService.TRASH_KEY))
            .then((emails)=>{
                this.emailsToShow = emails
            })
        
    },
    mounted() { },
    unmounted() { },
    components: {
        emailPreview
    },
}