import homePage from './views/home-page.page.cmp.js'
import emailApp from './views/email/email-app.page.cmp.js'
import noteApp from './views/note/note-app.page.cmp.js'
import emailPreview from './cmps/email/email-preview.cmp.js'
import emailDetails from './cmps/email/email-details.cmp.js'
import emailCompose from './cmps/email/email-compose.cmp.js'

const routes = [
	{
		path: '/',
		component: homePage,
	},
	{
		path: '/email',
		component: emailApp,
		children:[
			{
				path: ':emailId',
				component:emailDetails
			},
			{
				path: 'compose',
				component: emailCompose
			}
		]
		
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
