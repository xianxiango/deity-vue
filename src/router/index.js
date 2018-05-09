import Vue from 'vue'
import Router from 'vue-router'
import Deity from '@/components/Deity'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Deity',
      component: Deity
    }
  ]
})
