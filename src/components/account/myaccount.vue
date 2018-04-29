<template>
  <div>
     <blur :blur-amout="40" :url="user.url" :height="120">
      <p class="center"><img :src="user.url"></p>
    </blur>
     <group label-align="left" label-width="100px">
       <cell title="我的账号" :value="user.userName"></cell>
       <cell title="余额" :is-loading="showDeposit" :value="user.deposit"></cell>
       <cell is-link title="保证金充值" @click.native="showRecharge=true"></cell>
       <cell is-link title="修改密码" @click.native="showChangePass=true"></cell>
       <cell is-link title="我的闲置" @click.native="showBookView=true"></cell>
       <cell is-link title="充值记录"></cell>
    </group>
  
    <popup v-model="showRecharge">
      <Recharge  @updateDeposit="updateDeposit"></Recharge>
    </popup>
    
    <popup v-model="showChangePass">
      <ChangePass></ChangePass>
    </popup>

    <popup v-model="showBookView" height="90%">
       <BookView></BookView>
    </popup>

   </div>
</template>

<script >
	import {TransferDom,Cell,Group,XHeader,XButton,Blur,Alert,Popup} from 'vux'
	import Recharge from '@/components/account/recharge'
	import ChangePass from '@/components/account/changepass'
  import BookView from '@/components/repository/book-preview'

  import jQuery from 'jquery'

  function getCurrentUser($vue){
     $vue.showDeposit=true
     jQuery.ajax({
         type:'post',
         url:'/p2pbook/getCurrentUser',
         success:function(data){
           $vue.user.userName=data.userName
           $vue.user.deposit=data.deposit
           $vue.user.url=data.url
           $vue.showDeposit=false
         },
      })
  }

  function getDeposit($vue){
     $vue.showDeposit=true
     jQuery.ajax({
         type:'post',
         url:'/p2pbook/getDeposit',
         success:function(data){
           $vue.user.deposit=data.deposit
           $vue.showDeposit=false
         },
      })
  }

	export default {
   directives: {
        TransferDom
    }, 
	  components: {
	    Cell,Group,XHeader,XButton,Recharge,ChangePass,Blur,Alert,Popup,BookView
	  },
    created(){
      getCurrentUser(this)
    },
    methods:{
         updateDeposit(){
              getDeposit(this)
         },
    },
	  data(){
         return {
          user:{
            userName:'',
            deposit:'',
            url:'',
          },
          showDeposit:true,
         	showRecharge:false,
         	showChangePass:false,
          showBookView:false,
         }
	  },
	}

</script>

<style scoped>
    p{
    	margin:5px;
    }
	label.vux-label{
		font-size: 15px;
		text-align: left
	}
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }
  .center img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
</style>