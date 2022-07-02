import { emailService } from "../../services/email-service/email-service.js";
import { noteService } from "../../services/note-service/note-service.js";
import { appService } from "../../services/main-app-service/main-app-service.js";

import emailNav from "../../cmps/email/email-nav.cmp.js";
import emailFilter from "../../cmps/email/email-filter.cmp.js";
import emailFolderList from "../../cmps/email/email-folder-list.cmp.js";
import emailList from "../../cmps/email/email-list.cmp.js";
import emailPreview from "../../cmps/email/email-preview.cmp.js";
import emailCompose from "../../cmps/email/email-compose.cmp.js";
import emailSideMenu from "../../cmps/email/email-side-menu.cmp.js"


export default {
    props: [],
    template: `
    <section class="main-layout">
        <email-nav></email-nav>
        <!-- <email-filter></email-filter> -->
        <!-- <email-folder-list></email-folder-list> -->
        <div class="email-container">
            <email-side-menu></email-side-menu>
            <section class="email-list">
                <ul>
                    <li>
                        <div>
                        <!-- <button>^ Unread</button> -->
                        </div>
                        <!-- <div class="pagination">
                            <span>1-25</span>
                            <span>of 120</span>
                        </div> -->
            
                    </li>
                </ul>
                <email-list @dontRead="dontRead"/>

                <div @click="compose=!compose" class="compose-icon" ></div>
                    
                </section>
                <email-compose v-if="compose || isDraftEdit" @close="closeCompose"/>   
                <!-- <router-view></router-view> -->
        </div>
    </section>
`,
    data() {
        return {
            compose:false,
            isDraftEdit:false,

        };
    },
    methods: {
        dontRead(){
            console.log('please close');
        },
        closeCompose(){
           this.compose = false
        },
        sendMail(){
            this.compose = false
        }
    },
    computed: {},
    created() { },
    unmounted() { },
    components: {
        emailNav,
        emailFilter,
        emailFolderList,
        emailList,
        emailPreview,
        emailCompose,
        emailSideMenu, 
    },
}