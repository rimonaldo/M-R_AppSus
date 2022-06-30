import { emailService } from '../../services/email-service/email-service.js'
import { appService } from '../../services/main-app-service/main-app-service.js'

export default {
    props: [],
    template: `
    <section class="sent">


        <ul>
        <li  v-for="email in emails" :class="{read:email.isRead}">
            <div class="actions">
                <input  type="checkbox" v-model="email.isRead">
                <input  :class="{star:email.isStarred}" type="checkbox" >
            </div>
            <router-link :to="'/email/'+email.id">
                <span >{{email.sentBy.fullname}}</span>
                <span >{{email.subject}}</span>
                <span >{{email.body}}</span>
                <span>18:06</span>
            </router-link>
            <button @click.stop="remove(email.id)">x</button>
        </li>
        </ul>
    </section>
`,
    data() {
        return {
            emails: null,

        };
    },
    methods: {
        remove(id){
          emailService.remove(emailService.SENT_KEY,id)
				.then(()=>{
					console.log('deleted');
					const idx = this.emails.findIndex((email)=> email.id === id)
					this.emails.splice(idx,1)
                  
				})
		
        }
    },
    computed: {},
    created() {
       
    },
    mounted() { },
    unmounted() { },
    components: {},
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
        emails(newEmails, oldEmails) {
            // console.log('old:', oldEmails);
            // console.log('new:',newEmails);
            
        }
        
    }
}