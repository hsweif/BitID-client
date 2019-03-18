import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form'
import Interaction from '@/components/Interaction'
import Sensor from '@/components/Sensor'
import ObjectList from '@/components/ObjectList'
import NewSensor from '@/components/NewSensor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Form',
      component: Form 
    },
    {
      path: 'Interaction',
      name: 'Interaction',
      component: Interaction
    },
    {
      path: 'Sensor',
      name: 'Sensor',
      component: NewSensor 
    }
  ]
})
