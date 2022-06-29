import {emailService} from '../../services/email-service/email-service.js'
import {appService} from '../../services/main-app-service/main-app-service.js'

export default {
    props: ['email'],
    template: `
    <section class="preview">
  
    
       
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
        appService.query(emailService.EMAILS_KEY).then((emails)=>{
            this.emails = emails 
        })
    },
    mounted() {
        console.log(this.email);
     },
    unmounted() { },
    components: {
        emailService,
        appService,
        emailService,
        
    },
}