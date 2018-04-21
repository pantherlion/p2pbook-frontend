<template>
	<div>
		<x-input class="input" placeholder="管理员账号" v-model="username" required></x-input>
        <x-input class="input" placeholder="管理员密码" v-model="password" required :min="8"></x-input>
        <x-button type="primary">登录</x-button>
	</div>
</template>
<script>
	import {XInput,Group,XButton,Divider} from 'vux'
	let path =require('path')
	export default {
		data(){
			return {
				username:'',
				password:'',

			}
		},
		components:{
			XInput,Group,XButton,Divider
		}
	}

</script>

<style lang='less' scoped>
	.input{
	  margin-top:20px;
	  margin-bottom:20px
	}
</style>