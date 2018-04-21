<template>
  <div>
     <Portrait/>
     <group>
       <cell  title="我的账号" value="1196385362@qq.com"></cell>
       <cell title="余额" value="120.5"></cell>
       <cell is-link title="保证金充值" @click.native="showRecharge=true"></cell>
       <cell is-link title="修改密码" @click.native="showChangePass=true"></cell>
       <cell is-link title="我的闲置" link="/main/idlebook-preview"></cell>
       <cell is-link title="充值记录"></cell>
    </group>
    <Recharge :show="showRecharge" @reset0="showRecharge=false"></Recharge>
    <ChangePass :show="showChangePass" @reset1="showChangePass=false"></ChangePass>
   </div>
</template>

<script >
	import {Cell,Group,XHeader,XButton} from 'vux'
  import Portrait from '@/components/account/portrait'
	import Recharge from '@/components/account/recharge'
	import ChangePass from '@/components/account/changepass'

	export default { 
	  components: {
	    Cell,Group,XHeader,XButton,Recharge,ChangePass,Portrait
	  },
	  data(){
         return {
         	showRecharge:false,
         	showChangePass:false
         }
	  },
	  methods:{
	  },
	}

</script>

<style>
    p{
    	margin:5px;
    }
	label.vux-label{
		font-size: 15px;
		text-align: left
	}
</style>