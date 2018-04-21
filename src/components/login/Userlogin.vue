<template>
	<div>
		<x-input class="input" placeholder="邮箱或者手机" v-model="username" required></x-input>
        <x-input class="input" placeholder="密码" v-model="password" required :min="8"></x-input>
        <flexbox>
	        <flexbox-item>
	          <x-button type="primary" @click.native="submit">登录</x-button>
	        </flexbox-item>
	        <flexbox-item>
	          <x-button type="default" @click.native="doRegister">注册</x-button>
	        </flexbox-item>
      </flexbox>
	</div>
</template>
<script>
	import {XInput,Group,XButton,Flexbox, FlexboxItem,Divider} from 'vux'
	let path =require('path')
	export default {
		data(){
			return {
				username:'',
				password:'',

			}
		},
		components:{
			XInput,Group,XButton,Flexbox, FlexboxItem,Divider
		},
		methods:{
			doRegister:function(){
				this.$router.push({path:'/register'})
			},
			submit:function() {
				this.$router.push({path:'/main'})
			},
		}
	}

</script>

<style lang='less' scoped>
	.input{
	  margin-top:20px;
	  margin-bottom:20px
	}
</style>