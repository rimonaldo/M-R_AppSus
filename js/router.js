import homePage from './views/home-page.page.cmp.js'
import emailApp from './views/email/email-app.page.cmp.js'
import noteApp from './views/note/note-app.page.cmp.js'

const routes = [
	{
		path: '/',
		component: homePage,
	},
	{
		path: '/email',
		component: emailApp,
	},
	{
		path: '/note',
		component: noteApp,
	},
]

export const router = VueRouter.createRouter({
	routes,
	history: VueRouter.createWebHashHistory(),
})
