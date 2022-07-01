import emailPreview from "./email-preview.cmp.js";
import { emailService } from "../../services/email-service/email-service.js";

export default {
    props: [],
    template: `
    <h1>trash</h1>
    <email-preview v-if="emailsToShow" :emails="emailsToShow" 
    :class="'trashed'" @remove="removeEmail"/>
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