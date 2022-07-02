import { emailService } from "../../services/email-service/email-service.js"
import emailPreview from "./email-preview.cmp.js";
import emailCompose from "./email-compose.cmp.js";

export default {
    props: ['draftToAdd'],
    template: `
    <email-preview v-if="emailsToShow" :emails="emailsToShow" 
    :class="'drafts'" @remove="removeEmail"/>

`,
    data() {
        return {
            emailsToShow: [],
            draftToEdit: null
        };
    },
    methods: {
        removeEmail(email) {
            const id = email.id
            const idx = this.emailsToShow.findIndex((email) => email.id === id)
            this.emailsToShow.splice(idx, 1)
            email.status = 'sent'
            this.$emit('remove', email)
        },
        closeCompose() {

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
        emailPreview,
        emailCompose
    },
    watch: {
        draftToAdd: {
            // the callback will be called immediately after the start of the observation
            handler(draft, oldVal) {
                // do your stuff
                console.log('val of draft in draft page is : \n', draft);
            }
        },
        '$route.params': {
            handler() {
                console.log('this.$route.params:\n', this.$route.params);
                const draftId = this.$route.params.composeId
                emailService.get(emailService.SENT_KEY, draftId)
                    .then((draft) => {
                        console.log('and the draft is: \n', draft);
                        this.draftToEdit = draft
                    })
                // this.draftToEdit = this.$route.params.composeId
            },
            immediate: true,
        },
    }
}