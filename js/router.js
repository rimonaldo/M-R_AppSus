import homePage from "./views/home-page.page.cmp.js"
import emailApp from "./views/email/email-app.page.cmp.js"
import keepApp from "./views/keep/keep-app.page.cmp.js"


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/email',
        component: emailApp
    },
    {
        path: '/keep',
        component: keepApp
    }

]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})