import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import {useAuth} from 'stores/auth';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,



    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to) => {
    // ✅ This will work because the router starts its navigation after
    // the router is installed and pinia will be installed too
    const authStore = useAuth();
    const jwt = localStorage.getItem('feathers-jwt');
    if(jwt) {
      const  authUser =  await authStore.authenticate(); // jwt auth
      authStore.payload = authUser?.user;
    }
    if (to.meta['requiresAuth'] && !authStore.isAuthenticated) return '/'; //protected pg && authenticated

  });

  return Router
})
