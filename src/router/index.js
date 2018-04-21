import Vue from 'vue'
import Router from 'vue-router'
import MyAccount from '@/components/account/myaccount'
import Login from '@/components/login/login'
import Userlogin from '@/components/login/Userlogin'
import Adminlogin from '@/components/login/Adminlogin'
import Register from '@/components/register/register'
import Main from '@/components/main/main'

import IdleBookAdd from '@/components/idlebook/idlebook-add'
import IdleBookDetail from '@/components/idlebook/idlebook-detail'
import IdleBookPreview from '@/components/idlebook/idlebook-preview'

import BookList from '@/components/repository/book-list'
import BookPublisher from '@/components/repository/book-publisher'
import BookPreview from '@/components/repository/book-preview'
import BookDetail from '@/components/repository/book-detail'

import SwapMain from '@/components/swap/main'
import WaitingSwap from '@/components/swap/waiting-swap'
import SwapInfo from '@/components/swap/swap-info'
import DealStatus from '@/components/swap/deal-status'
import DealInfo from '@/components/swap/deal-info'

import Myread from '@/components/myread/myread-preview'
import MyreadDetail from '@/components/myread/myread-detail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
      children:[
         {
           path:'userlogin',
    	     component:Userlogin
         },
         {
         	path:'adminlogin',
         	component:Adminlogin
         }
      ]
    },
    {
      path:'/register',
      component:Register
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
            path:'repository/book-publisher',
            component:BookPublisher,
          },
          {
            path:'repository/book-preview',
            component:BookPreview,
          },
          {
             path:'repository/book-detail',
             component:BookDetail,
          },
          {
             path:'myread/myread-preview',
             component:Myread,
          },
          {
            path:'myread/myread-detail',
            component:MyreadDetail,
          },
         {
            path:'account',
            component:MyAccount
         },
         {
            path:'idlebook-add',
            component:IdleBookAdd,
          },
          {
            path:'idlebook-preview',
            component:IdleBookPreview,
          },
          {
            path:'idlebook-detail',
            component:IdleBookDetail,
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
                path:'swap-info',
                component:SwapInfo
              },
              {
                path:'deal-status',
                component:DealStatus,
              },
              {
                path:'deal-info',
                component:DealInfo,
              }
            ]
          },
      ],
    },
  ]
})
