<template>
	<div>
   	  	<divider>密码修改</divider>
   	  	<group>
   	  		<x-input class="input" type="password" placeholder="输入原密码" v-model="oldPass" required :min="8"></x-input>
            <x-input class="input" type="password" placeholder="输入新密码" v-model="newPass" required :min="8"></x-input>
   	  		<x-button type="primary" @click.native="submit" plain.type="primary">确认修改</x-button>
   	  	</group>
   	   <alert v-model="showSuccess" title="修改密码成功"></alert>
   	   <alert v-model="showFail" title="修改密码失败"></alert>
	</div>
</template>

<script>
	import {Divider,Group,XInput,XButton,Alert} from 'vux'
	import jQuery from 'jquery'
	export default {
		  components:{
		  	Divider,XInput,Group,XButton,Alert
		  },
		  data(){
             return {
             	oldPass:'',
             	newPass:'',
             	showSuccess:false,
             	showFail:false,
             }
		  },
		  methods:{
		  	submit(){
		  		let param={oldPassWord:this.oldPass,newPassWord:this.newPass}
		  		let $this = this
		  		jQuery.ajax({
		  			type:"post",
		  			url:"/p2pbook/updatePass",
		  			data:JSON.stringify(param),
		  			contentType:"application/json;charset=UTF-8",
		  			success:function(data){
		  				if(data.result==='success'){
		  					 $this.showSuccess=true
		  				}
		  				else{
		  					 $this.showFail=true
		  				}
		  			},
		  			fail:function(){
		  				 $this.showFail=true
		  			},

		  		})
		  	}
		  },
	}

</script>