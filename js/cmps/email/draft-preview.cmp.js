import { emailService } from "../../services/email-service/email-service.js"
import emailPreview from "./email-preview.cmp.js";
import emailCompose from "./email-compose.cmp.js";

export default {
    props: ['draftToAdd'],
    template: `
    <email-preview v-if="emailsToShow" :emails="emailsToShow" 
    :class="'drafts'" @remove="removeEmail"/>

    <!-- <section class="preview" >
        <li  v-for="email in emailsToShow" 
		:class="[{select:email.isSelected},{drafts:email.status === 'draft'},
		{trashed:email.status === 'trash'},{trashed:email.isTrashed},]">

            <div class="actions" >
                <input  type="checkbox" v-model="email.isSelected">                
				<div class="stars" :class="{hide:email.status === 'trash'}
				,{hide:email.status === 'draft'}">
					<span @click="toggleStar(email)" :class="{checked:email.isStarred}" class="star-bottom"></span>
					<span @click="toggleStar(email)" :class="{checked:email.isStarred}" class="star"></span>
				</div>
            </div>
			+email.id
            <router-link :to="'/email/show/'+'draft/'+'compose/'+email.id">
                <span >{{email.sentBy.fullname}}</span>
                <span >{{email.subject}}</span>
                <span >{{email.body}}</span>
                <span>18:06</span>
                <email-compose v-if="draftToEdit" :draft="draftToEdit" @close="closeCompose"/>
            </router-link>

			<button @click.stop="removeEmail(email)">x</button>

        </li>
    </section> -->
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
        closeCompose(){

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
    watch:{
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
                emailService.get(emailService.SENT_KEY,draftId )
                    .then((draft)=>{
                        console.log('and the draft is: \n', draft);
                        this.draftToEdit = draft
                    })
                // this.draftToEdit = this.$route.params.composeId
			},
			immediate: true,
		},
    }
}