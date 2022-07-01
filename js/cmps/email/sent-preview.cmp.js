import { emailService } from '../../services/email-service/email-service.js'
import emailPreview from './email-preview.cmp.js';

export default {
    props: [],
    template: `
    <section class="sent">
        <ul>
            <email-preview :emails="emailsToShow "  @remove="removeEmail"/>
        </ul>
    </section>
`,
    data() {
        return {
            emailsToShow: [],


        };
    },
    methods: {
        removeEmail(email) {
            console.log(email);
            const { key, id } = email
            const idx = this.emailsToShow.findIndex((email) => email.id === id)
            this.emailsToShow.splice(idx, 1)
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
                        sent.filter((email)=>{
                            if(email.status !== 'draft'){
                                this.emailsToShow.push(email)
                            }
                        })
                    })
            },
            immediate: true
        },
    }
}
