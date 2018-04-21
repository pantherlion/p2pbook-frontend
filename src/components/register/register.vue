<template>
	<div>
		<x-header>用户注册</x-header>
		<group  label-align="left" label-width="100px">
			<x-input title="用户名" placeholder="尽量采用电话号码或者邮箱" v-model="username"></x-input>
			<x-input title="密码"  placeholder="必填，密码长度需要8位" type="password" v-model="password" :min="8"></x-input>
			<x-input title="密码确认"  placeholder="必填" type="password"  :equal-with="password"></x-input>
			<x-input title="姓名"  placeholder="必填" is-type="china-name" v-model="name"></x-input>
			<x-input title="手机号码"  placeholder="必填" is-type="china-mobile" v-model="tel"></x-input>
			<x-input title="身份证号码" placeholder="必填"  v-model="identity"></x-input>
		</group>
		<group label-align="left">
		    <x-address title="收货地址"  v-model="address" :list="addressData" placeholder="请选择地址" inline-desc="省，市，县"></x-address>
		    <x-textarea :max="200" v-model="street"  placeholder="街道/小区"></x-textarea>
		</group>
		 <x-button type="primary">注册</x-button>
	</div>
</template>

<script>
	import {XInput, Group, XButton,XHeader,XAddress,ChinaAddressV4Data,XTextarea  } from 'vux'
	export default{
		components:{
			XInput,XButton,Group,XHeader,XAddress,XTextarea 
		},
		data(){
			return {
				picpath:'',
				username:'',
				password:'',
				name:'',
				tel:'',
				identity:'',
				address:[],
				addressData: ChinaAddressV4Data,
				street:''
			}
		},
		methods:{

		}
	}

</script>