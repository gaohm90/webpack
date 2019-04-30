import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Device from '@/components/set/Device'
import Tongji from '@/components/set/TongJi'
import Fankui from '@/components/set/Fankui'
import TongZhi from '@/components/set/TongZhi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/device',
      component: Device
    },
    {
      path: '/tongji',
      component: Tongji
    },
    {
      path: '/fankui',
      component: Fankui
    },
    {
      path: '/tongzhi',
      component: TongZhi
    }
  ]
})
