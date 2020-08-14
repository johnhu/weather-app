import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchPage from '@/views/SearchPage'
import SearchResults from '@/views/SearchResults'
import WeatherData from '@/views/WeatherData'
import CurrentCity from '@/views/CurrentCity'


Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'SearchPage',
      component: SearchPage
    },
    {
      path: '/results',
      name: 'SearchResults',
      component: SearchResults
    },
    {
      path: '/weather',
      name: 'WeatherData',
      component: WeatherData
    },
    {
      path: '/current',
      name: 'CurrentCity',
      component: CurrentCity
    }
]

const router = new VueRouter({
  routes
})

export default router
