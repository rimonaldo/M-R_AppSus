const { createApp } = Vue

import { router } from './router.js'
import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'


const options = {
    template: `
    <app-header/>
    <router-view>
        
    </router-view>
    <app-footer/>
    `,
    components: {
        appHeader,
        appFooter
    }     
}


const app = createApp(options)
app.use(router)
app.mount('#app')