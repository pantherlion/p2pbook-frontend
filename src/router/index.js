import Vue from 'vue'
import Router from 'vue-router'
import MyAccount from '@/components/account/myaccount'
import Login from '@/components/login/login'
import Register from '@/components/register/register'
import Main from '@/components/main/main'


import BookList from '@/components/repository/book-list'
import BookPublisher from '@/components/repository/book-publisher'
import BookPreview from '@/components/repository/book-preview'
import BookDetail from '@/components/repository/book-detail'
import BookAdd from '@/components/repository/book-add'

import SwapMain from '@/components/swap/main'
import WaitingSwap from '@/components/swap/waiting-swap'
import SwapInfo from '@/components/swap/swap-info'
import DealStatus from '@/components/swap/deal-status'
import DealInfo from '@/components/swap/deal-info'

import MyreadPreview from '@/components/myread/myread-preview'
import MyreadDetail from '@/components/myread/myread-detail'

import Admin from '@/components/admin/deal-status'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'/admin',
      component:Admin
    },
    {
      path:'/main',
      component:Main,
      children:[
         {
            path:'repository/book-list',
            component:BookList,
         },
          {
            path:'repository/book-add',
            component:BookAdd,
          },
          {
             path:'myread/myread-preview',
             component:MyreadPreview,
          },
         {
            path:'account',
            component:MyAccount
         },
          {
            path:'swap/main',
            component:SwapMain,
            children:[
              {
                path:'waiting-swap',
                component:WaitingSwap,
              },
              {
                path:'deal-status',
                component:DealStatus,
              },
            
            ]
          },
      ],
    },
  ]
})
