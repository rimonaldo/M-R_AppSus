import { emailService } from '../../services/email-service/email-service.js'
import { appService } from '../../services/main-app-service/main-app-service.js'
import emailPreview from './email-preview.cmp.js';

export default {
    props: [],
    template: `
    <section class="sent">
        <ul>
            <email-preview :emails="emails"  @remove="removeEmail"/>
        </ul>
    </section>
`,
    data() {
        return {
            emails: null,

        };
    },
    methods: {
        removeEmail(email) {
            const { key, id } = email
            const idx = this.emails.findIndex((email) => email.id === id)
            this.emails.splice(idx, 1)
            this.$emit('remove', { key, id })
        }, 
    },
    computed: {},
    created() {

    },
    mounted() { },
    unmounted() { },
    components: {
        emailPreview,

    },
    watch: {
        '$route.params': {
            handler() {
                emailService.query(emailService.SENT_KEY)
                    .then((sent) => {
                        this.emails = sent
                    })
            },
            immediate: true
        },
    }
}