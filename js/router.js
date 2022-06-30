import homePage from './views/home-page.page.cmp.js'
import emailApp from './views/email/email-app.page.cmp.js'
import noteApp from './views/note/note-app.page.cmp.js'
import noteList from './cmps/note/note-list.cmp.js'
import emailPreview from './cmps/email/email-preview.cmp.js'
import emailDetails from './cmps/email/email-details.cmp.js'
import emailCompose from './cmps/email/email-compose.cmp.js'
import sentPreview from './cmps/email/sent-preview.cmp.js'


const routes = [
	{
		path: '/',
		component: homePage,
	},
	{
		path: '/email',
		component: emailApp,
		children: [
			{
				path: ':emailId',
				component: emailDetails,
			},
			
			{
				path: 'show/:show',
				component: sentPreview,
				children:[
					{
						path: 'compose',
						component: emailCompose,
						children: [
							{
								path: ':composeId',
								component: emailCompose
							}
						]
					},
				]
			},
			

		],
	},

	{
		path: '/note',
		component: noteApp,
		children: [
			{
				path: ':noteId',
				component: noteList,
			},
		],
	},
]

export const router = VueRouter.createRouter({
	routes,
	history: VueRouter.createWebHashHistory(),
})
