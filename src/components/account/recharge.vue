<template>
  <div>
	<div v-transfer-dom>
       	  <popup v-model="show0" position="bottom">
       	  	<divider>请选择金额</divider>
			   <checker
			    v-model="money"
			    default-item-class="demo-item"
			    selected-item-class="demo-item-selected"
			    >
			      <checker-item v-for="i in 5" :key="i" :value="i">￥{{i*50}}</checker-item>
			   </checker>
       	  	<group>
       	  		<x-button type="primary" @click.native="show0=false" plain.type="primary">支付</x-button>
       	  	</group>
       	  </popup>
    </div>
  </div>
</template>

<script>
	import {Popup,TransferDom,Group,XButton,Checker, CheckerItem,Divider} from 'vux'
	export default {
		 directives: {
		    TransferDom
		  },
		  components: {
		    Popup,Group,XButton,Checker,CheckerItem,Divider
		  },
		  data(){
             return {
             	money:0,
             }
		  },
		  computed:{
		  	show0:
		  	  {
		  	  	 get:function(){
		  	  	 	 return this.show
		  	  	 },
		  	  	 set:function(newValue){
		  	  	 	if (newValue==false){
		  	  	 		this.$emit('reset0')
		  	  	 	}
		  	  	 },
		  	  },
		  },
		  props:['show'],
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