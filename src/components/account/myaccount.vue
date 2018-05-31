  <template>
  <div>
     <blur :blur-amout="40" :url="user.url" :height="120">
      <p class="center"><img :src="user.url"></p>
    </blur>
     <group label-align="left" label-width="100px">
       <cell title="用户名" :value="user.userName"></cell>
       <cell title="余额" :is-loading="showDeposit" :value="user.deposit"></cell>
       <cell is-link title="保证金充值" @click.native="showRecharge=true"></cell>
       <cell is-link title="修改密码" @click.native="showChangePass=true"></cell>
       <cell is-link title="我的闲置" @click.native="showBookView=true"></cell>
       <cell is-link title="充值记录" @click.native="showRechargeDetail=true"></cell>
       <cell is-link title="消费记录" @click.native="showConsumeDetail=true"></cell>
    </group>
    <x-button  type="warn" style="margin-top:20px;" @click.native="logout" >退出</x-button>
  
    <popup v-model="showRecharge">
      <Recharge  @updateDeposit="updateDeposit"></Recharge>
    </popup>
    
    <popup v-model="showChangePass">
      <ChangePass></ChangePass>
    </popup>

    <popup v-model="showBookView" width="100%" position="right" should-rerender-on-show>
       <x-switch title="" v-model="showBookView"></x-switch>
       <BookView></BookView>
    </popup>

    <popup v-model="showRechargeDetail" width="100%" position="right" should-rerender-on-show>
      <x-switch title="" v-model="showRechargeDetail"></x-switch>
      <RechargeDetail/>
    </popup>

    <popup v-model="showConsumeDetail" width="100%" position="right" should-rerender-on-show>
      <x-switch title="" v-model="showConsumeDetail"></x-switch>
      <ConsumeDetail/>
    </popup>

   </div>
</template>

<script >
	import {Cell,Group,XHeader,XButton,Blur,Alert,Popup,XSwitch } from 'vux'
	import Recharge from '@/components/account/recharge'
	import ChangePass from '@/components/account/changepass'
  import BookView from '@/components/repository/book-preview'
  import RechargeDetail from '@/components/account/recharge-detail'
  import ConsumeDetail from '@/components/account/consume-detail'

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
	  components: {
	    Cell,Group,XHeader,XButton,Recharge,ChangePass,Blur,Alert,Popup,BookView,XSwitch,RechargeDetail,ConsumeDetail 
	  },
    created(){
      getCurrentUser(this)
    },
    methods:{
         updateDeposit(){
              getDeposit(this)
         },
         logout(){
            this.$router.push('/')
         }
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
          showRechargeDetail:false,
          showConsumeDetail:false,
         }
	  },
	}

</script>

<style  scoped>
  p{
  	margin:7px;
  }
  .center {
    text-align: center;
    padding-top: 20px;
  }
  .center img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
</style>