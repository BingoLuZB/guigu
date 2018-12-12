import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/Home'
import Order from '../pages/Order/Order'
import Search from '../pages/Search/Search'
import Person from '../pages/Person/Person'
import Login from '../pages/Login/Login'
import shop from '../pages/shop/shop'
import shopEvaluate from '../pages/shop/shopEvaluate/shopEvaluate'
import shopOrder from '../pages/shop/shopOrder/shopOrder'
import shopSeller from '../pages/shop/shopSeller/shopSeller'

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
    },
    {
      path:'/userInfo',
      component:Login,
      meta:{
        showfooter:false
      }
    },
    {
      path:'/shop',
      component:shop,
      meta:{
        showfooter:false
      },
      children:[
        {
          path:'evaluate',
          component:shopEvaluate,
          meta:{
            showfooter:false
          },
        },
        {
          path:'order',
          component:shopOrder,
          meta:{
            showfooter:false
          },
        },
        {
          path:'seller',
          component:shopSeller,
          meta:{
            showfooter:false
          },
        },
        {
          path:'',
          redirect:'order',
          meta:{
            showfooter:false
          },
        }
      ]
    }
  ]
})
