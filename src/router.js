import Vue from 'vue'
import Router from 'vue-router'
// import Home from ''
import RestroomsIndex from './views/RestroomsIndex.vue'
import RestroomsNew from './views/RestroomsNew.vue'
import RestroomsShow from './views/RestroomsShow.vue'
import RestroomsEdit from './views/RestroomsEdit.vue'
import Map from './views/Map.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // { path: '/', name: 'home', component: Home},
    { path: '/restrooms', name: 'restrooms-index', component: RestroomsIndex },
    { path: '/restrooms/new', name: 'restrooms-new', component: RestroomsNew },
    { path: '/restrooms/:id', name: 'restrooms-show', component: RestroomsShow },
    { path: '/restrooms/:id/edit', name: 'restrooms-edit', component: RestroomsEdit },
    { path: '/map', name: 'restrooms-map', component: Map },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', component: Logout }
  ]
})
