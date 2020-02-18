import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form'
import Interaction from '@/components/Interaction'
import Sensor from '@/components/Sensor'
import ObjectList from '@/components/ObjectList'
import NewSensor from '@/components/NewSensor'
import Notification from '@/components/Notification'
import index from '@/components/index'
import render from '@/components/render'

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
      component: NewSensor 
    },
    {
      path: 'Form',
      name: 'Form',
      component: Form 
    }
  ]
})
