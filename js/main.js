const {createApp} = Vue

import {router} from './router.js'


const options = {
	template: `
   <section>
    
        <router-view>
            
        </router-view>
   </section>
    `,
    data(){
        return{
            email:false,
            note:false
        }

    },
	components: {
	},
}

const app = createApp(options)
app.use(router)
app.mount('#app')
