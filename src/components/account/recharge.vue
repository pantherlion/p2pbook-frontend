<template>
  <div>	
	  <divider>请选择金额</divider>
	   <checker
	    v-model="money"
	    default-item-class="demo-item"
	    selected-item-class="demo-item-selected"
	    >
	      <checker-item v-for="i in 5" :key="i" :value="i*50">￥{{i*50}}</checker-item>
	   </checker>
	  	<group>
	  		<x-button type="primary" @click.native="addDeposit" plain.type="primary">支付</x-button>
	  	</group>
    <alert v-model="showSuccess" title="充值成功"></alert>
    <alert v-model="showFail" title="充值失败"></alert>
  </div>
</template>

<script>
	import {Popup,TransferDom,Group,XButton,Checker, CheckerItem,Divider,Alert} from 'vux'
    import jQuery from 'jquery'

 function addDeposit($vue){
    let param={deposit:$vue.money}
    jQuery.ajax({
         type:'post',
         url:'/p2pbook/addDeposit',
         data:JSON.stringify(param),
         contentType:"application/json;charset=UTF-8",
         success:function(data){
         	if (data.result==='success'){
         		 $vue.showSuccess=true
         		 $vue.$emit('updateDeposit')
         	}
         	else{
         		 $vue.showFail=true
         	}
         },
         fail:function(){
           $vue.showFail=true
         },
      })
  }
	export default {
		  components: {
		    Group,XButton,Checker,CheckerItem,Divider,Alert
		  },
		  data(){
             return {
             	money:0,
             	showSuccess:false,
                showFail:false,
             }
		  },
		  methods:{
		  	addDeposit(){
		  		addDeposit(this)
		  	}
		  },
		}
</script>

<style>
	.demo-item {
	  background-color: #ddd;
	  color: #222;
	  font-size: 14px;
	  padding: 5px 10px;
	  margin-right: 10px;
	  line-height: 18px;
	  border-radius: 15px;
	}
	.demo-item-selected {
	  background-color: #FF3B3B;
      color: #fff;
	}
</style>