<template>
	<div>
		 <form-preview v-for="item in list" header-label="消费金额" :header-value="item.money" :body-items="item.desc"></form-preview>
	</div>
</template>

<script>
   import {FormPreview } from 'vux'
   import jQuery from 'jquery'
   function getConsumeDetail($vue){
      jQuery.ajax({
      	type:'GET',
      	url:'/p2pbook/getConsumeDetail',
      	success:function(data){
      		let list=[]
      		data.forEach((item,index)=>{
      			let consumeDetail = {}
      			consumeDetail.money=item.money
      			consumeDetail.desc=[]
      			consumeDetail.desc.push({label:'时间',value:timeStamp2String(item.time)})
      			list.push(consumeDetail)
      		})
      		$vue.list=list
      	},
      })
   }

   export default {
   	 components:{
   	 	FormPreview
   	 },
   	 created(){
   	 	getConsumeDetail(this)
   	 },
   	 data(){
   	 	return {
   	 		list:[],
   	 	}
   	 },
   }

   function timeStamp2String (time){
        var datetime = new Date();
         datetime.setTime(time);
         var year = datetime.getFullYear();
         var month = datetime.getMonth() + 1;
         var date = datetime.getDate();
         var hour = datetime.getHours();
         var minute = datetime.getMinutes();
         var second = datetime.getSeconds();
         return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second+".";
};

</script>

<style>
	
</style>