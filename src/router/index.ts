import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Edit from '../pages/Edit.vue'
import Create from '../pages/Create.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/create', component: Create },
  { path: '/edit/:id', component: Edit }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
