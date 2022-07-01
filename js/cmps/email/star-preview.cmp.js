import { emailService } from "../../services/email-service/email-service.js";
import emailPreview from "./email-preview.cmp.js";

export default {
    props: [],
    template: `
    <section class="starred-emails">
        <email-preview v-if="emails" :emails="emails"/>
    </section>
`,
    data() {
        return {
            emails:null,

        };
    },
    methods: {},
    computed: {},
    created() { 
        this.emails = emailService.getStars()
        console.log('helo');
        console.log(this.emails);
    },
    mounted() { },
    unmounted() { },
    components: {
        emailPreview
    },
}