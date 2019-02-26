import Vue from 'vue'
import Router from 'vue-router'
import RestroomsIndex from './views/RestroomsIndex.vue'
import RestroomsNew from './views/RestroomsNew.vue'
import RestroomsShow from './views/RestroomsShow.vue'
import RestroomsEdit from './views/RestroomsEdit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home},
    { path: '/restrooms', name: 'restrooms-index', component: RestroomsIndex },
    { path: '/restrooms/new', name: 'restrooms-new', component: RestroomsNew },
    { path: '/restrooms/:id', name: 'restrooms-show', component: RestroomsShow },
    { path: '/restrooms/:id/edit', name: 'restrooms-edit', component: RestroomsEdit }
  ]
})
