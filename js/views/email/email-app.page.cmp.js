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
        <email-filter></email-filter>
        <email-folder-list></email-folder-list>
        <email-side-menu></email-side-menu>
        <section class="list">
        <ul>
            <li>
                <div>
                   <button>^ Unread</button>
                </div>
                <div class="pagination">
                    <span>1-25</span>
                    <span>of 120</span>
                </div>
    
            </li>
        </ul>
        </section>
        <email-list></email-list>
        <email-preview></email-preview>
        <email-compose></email-compose>
    </section>
`,
    data() {
        return {};
    },
    methods: {},
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