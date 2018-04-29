<template>
	<div>
		<x-header>用户注册</x-header>
	    <div>
	    	<p class="center" ><img  :src="user.url" @click="$refs.upload_file.click()"></p>
	    	<p><input  @change="fileChange()" type="file" ref="upload_file" style="display:none"/></p>
	    </div>
		
		<group  label-align="left" label-width="100px">
			<x-input title="用户名" placeholder="尽量采用电话号码或者邮箱" v-model="user.userName"></x-input>
			<x-input title="密码"  placeholder="必填，密码长度需要8位" type="password" v-model="user.passWord" :min="8"></x-input>
			<x-input title="姓名"  placeholder="必填" is-type="china-name" v-model="user.name"></x-input>
			<x-input title="手机号码"  placeholder="必填" is-type="china-mobile" v-model="user.tel"></x-input>
			<x-input title="身份证号码" placeholder="必填"  v-model="user.identity"></x-input>
		</group>
		<group label-align="left">
		    <x-address title="收货地址"  v-model="user.myaddress" :list="addressData" placeholder="请选择地址" inline-desc="省，市，县"></x-address>
		    <x-textarea :max="200" v-model="user.street"  placeholder="街道/小区"></x-textarea>
		</group>
		 <x-button type="primary" @click.native="submit">注册</x-button>
		 <alert v-model="show0" title="注册失败，用户名已存在"></alert>
		 <alert v-model="show1" title="注册成功"></alert>
	</div>
</template>

<script>
	import {XInput, Group, XButton,XHeader,XAddress,ChinaAddressV4Data,XTextarea,Value2nameFilter as value2name ,Alert,Blur } from 'vux'
	import jQuery from 'jquery'
	export default{
		components:{
			XInput,XButton,Group,XHeader,XAddress,XTextarea,Alert,Blur 
		},
		data(){
			return {
				user:{
					picpath:'',
					userName:'',
					passWord:'',
					name:'',
					tel:'',
					identity:'',
					myaddress:[],
					street:'',
					address:'',
					url:'',
				},
				addressData: ChinaAddressV4Data,
				show0:false,
				show1:false,
			}
		},
		methods:{
			fileChange(){
				let $this =this
				let img=this.$refs.upload_file.files[0]
				let fr = new FileReader()
				fr.readAsDataURL(img);
				fr.onloadend =function(){
					$this.user.url=this.result
				}
			},
			submit(){
				//拼接地址
				this.user.address=value2name(this.user.myaddress,ChinaAddressV4Data)+' '+this.user.street
				let $this=this;
				jQuery.ajax({
		          type:'post',
		          url:'/p2pbook/register',
		          data:JSON.stringify(this.user),
		          contentType:"application/json;charset=UTF-8",
		          success:function(data){
		             if(data.result=='success'){
		             	$this.show1=true;
		             }
		             else{
		             	$this.show0=true
		             }
		          }
		        })
			}
		}
	}
</script>

<style scoped>
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
