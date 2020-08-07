import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const page = name => () => import('@/pages/' + name)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/home', name: 'home', component: page('home')}, 
    {path: '/', name: 'login', component: page('login')}, 


  ]
})
