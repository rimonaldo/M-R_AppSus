import emailPreview from "./email-preview.cmp.js";
import { emailService } from "../../services/email-service/email-service.js";

export default {
    props: [],
    template: `
    <email-preview v-if="emailsToShow" :emails="emailsToShow" 
    :class="'trashes'" @remove="removeEmail"/>
`,
    data() {
        return {
            emailsToShow: [],

        };
    },
    methods: {},
    computed: {},
    created() {
        console.log('helo');
        emailService.query(('inbox'))
            .then((emails) => {
                emails.filter((email) => {
                    console.log(email);
                    if (email.status === 'trash') {
                        this.emailsToShow.push(email)
                    }
                })
            })

        // emailService.query(('sent'))
        //     .then((emails) => {
        //         emails.filter((email) => {
        //             console.log(email);
        //             if (email.status === 'trash') {
        //                 this.emailsToShow.push(email)
        //             }
        //         })
        //     })
        console.log('helo', this.emailsToShow);
    },
    mounted() { },
    unmounted() { },
    components: {
        emailPreview
    },
}