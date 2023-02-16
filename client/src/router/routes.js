
const routes = [
  {
    path: '/',
    component: () => import('layouts/StaticLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/todos',
    component: () => import('layouts/DashboardLayout.vue'),
    meta: {requiresAuth: true, },
    children: [
      { path: '', component: () => import('pages/TodosPage.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
