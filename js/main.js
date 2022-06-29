const {createApp} = Vue
import appHeader from './cmps/main-app/app-header.cmp.js'
import appFooter from './cmps/main-app/app-footer.cmp.js'
import {router} from './router.js'


const options = {
	template: `
   <section>

        <router-view>
            
        </router-view>
        <app-footer></app-footer>
   </section>
    `,
    data(){
        return{
            email:false,
            note:false
        }

    },
	components: {
        appFooter,
        appHeader
	},
}

const app = createApp(options)
app.use(router)
app.mount('#app')
