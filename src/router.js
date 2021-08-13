// @ts-check
import { Router } from '@vaadin/router'; // for Webpack / Polymer CLI

// select the DOM node where the router inserts route Web Components
const outlet = document.getElementById('app-body');
const router = new Router(outlet);

router.setRoutes([
  { path: '/', component: 'af-homepage' },
  {
    path: '/anime',
    children: [
      { path: '/', redirect: '/' },
      { path: '/:id/:title?', component: 'af-detailanime' },
      { path: '/:id/:title/(.*)', redirect: '/anime/:id/:title' },
    ],
  },
  {
    path: '/review',
    children: [
      { path: '/', redirect: '/' },
      { path: '/:id', component: 'af-reviewdetailanime' },
      { path: '/:id/(.*)', redirect: '/review/:id' },
    ],
  },
  { path: '/search', component: 'af-searchanime' },
  { path: '/mock', component: 'af-mock' },
  { path: '(.*)', component: 'af-notfoundpage' },
]);

export default router;
