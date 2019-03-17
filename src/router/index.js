import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form'
import Interaction from '@/components/Interaction'
import Sensor from '@/components/Sensor'
import ObjectList from '@/components/ObjectList'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home 
    },
    {
      path: 'Interaction',
      name: 'Interaction',
      component: Interaction
    },
    {
      path: 'Sensor',
      name: 'Sensor',
      component: Sensor
    }
  ]
})
