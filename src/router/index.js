import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/Home'
import Order from '../pages/Order/Order'
import Search from '../pages/Search/Search'
import Person from '../pages/Person/Person'
import Login from '../pages/Login/Login'

Vue.use(Router)
export default new Router({
  routes:[
    {
      path:'/',
      redirect:'/home',
      component:Home,
      meta:{
        showfooter:true
      }
    },
    {
      path:'/home',
      component:Home,
      meta:{
        showfooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        showfooter:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        showfooter:true
      }
    },
    {
      path:'/person',
      component:Person,
      meta:{
        showfooter:true
      }
    },
    {
      path:'/login',
      component:Login,
      meta:{
        showfooter:false
      }
    }

  ]
})
