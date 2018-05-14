import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import home from '@/components/Home'
import jjdj from '@/components/jjdj/form.vue'
import jjSearch from '@/components/jjdj/jjSearch.vue'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      Router,
      component: home
    },
    {
      path: '/jjdj',
      name: 'jjdj',
      component: jjdj
    },
    {
      path: '/jjSearch',
      name: 'jjSearch',
      component: jjSearch
    }
  ]
})
