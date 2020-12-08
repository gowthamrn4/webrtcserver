import App from '../components/app/App'
import BrowsePage from '../pages/browse/BrowsePage'
import PartyPage from '../pages/party/PartyPage'
import SearchPage from '../pages/search/SearchPage'
import LoginPage from '../pages/login';

// export const routes = [
// 	{
// 		path: '/',
// 		component: LoginPage,
// 	},
// 	{
// 		path: '/home',
// 		component: App,
// 		childRoutes: [
// 			{
// 				indexRoute: {
// 					component: BrowsePage
// 				}
// 			},
// 			{
// 				path: '/party/:partyId',
// 				component: PartyPage
// 			},
// 			{
// 				path: '/search/:query',
// 				components: SearchPage
// 			}
// 		]
// 	}
// ];

export const routes = {
	path: '/',
	component: App,
	childRoutes: [
		{
			indexRoute: {
				component: BrowsePage
			}
		},
		{
			path: '/party/:partyId',
			component: PartyPage
		},
		{
			path: '/search/:query',
			components: SearchPage
		}
	]
}