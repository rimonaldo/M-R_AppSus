import homePage from "./views/home-page.page.cmp.js"

const routes = [
     {
        path: '/',
        component: homePage
     },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})