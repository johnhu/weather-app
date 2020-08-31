import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/views/Search'
import WeatherData from '@/views/WeatherData'


Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/weather',
      name: 'WeatherData',
      component: WeatherData
    }
]

const router = new VueRouter({
  routes
})

export default router
