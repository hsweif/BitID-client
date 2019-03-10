import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form'
import Interaction from '@/components/Interaction'
import Sensor from '@/components/Sensor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Form',
      component: Form 
    },
    {
      path: 'interaction',
      name: 'interaction',
      component: Interaction
    },
    {
      path: 'sensor',
      name: 'sensor',
      component: Sensor
    }
  ]
})
