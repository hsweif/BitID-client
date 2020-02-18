import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form'
import Sensor from '@/components/Sensor'
import Notification from '@/components/Notification'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Notification 
    },
    {
      path: 'Interaction',
      name: 'Interaction',
      component: index 
    },
    {
      path: 'Sensor',
      name: 'Sensor',
      component: Sensor 
    },
    {
      path: 'Form',
      name: 'Form',
      component: Form 
    }
  ]
})
