import { emailService } from "../../services/email-service/email-service.js"
import emailPreview from "./email-preview.cmp.js";

export default {
    props: [],
    template: `
    <email-preview v-if="emailsToShow" :emails="emailsToShow" 
    :class="'drafts'" @remove="removeEmail"/>
`,
    data() {
        return {
            emailsToShow: [],
        };
    },
    methods: {
        removeEmail(email) {
            const key = emailService.SENT_KEY
            const id = email.id
            const idx = this.emailsToShow.findIndex((email) => email.id === id)
            this.emailsToShow.splice(idx, 1)
            this.$emit('remove', { key, id })
        },
    },
    computed: {},
    created() {
        emailService.query((emailService.SENT_KEY))
            .then((emails) => {
                emails.filter((email) => {
                    if (email.status === 'draft') {
                        this.emailsToShow.push(email)
                    }
                })
            })
    },
    mounted() { },
    unmounted() { },
    components: {
        emailPreview
    },
}