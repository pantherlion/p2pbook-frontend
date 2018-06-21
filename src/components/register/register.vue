<template>
	<div>
		<x-header>用户注册</x-header>
	    <div>
	    	<p class="center" ><img  :src="user.url" @click="$refs.upload_file.click()"></p>
	    	<p><input  @change="fileChange()" type="file" ref="upload_file" style="display:none"/></p>
	    </div>
		
		<group  label-align="left" label-width="100px">
			<x-input title="用户名" ref="userName" placeholder="尽量采用电话号码或者邮箱" v-model="user.userName" required></x-input>
			<x-input title="密码" ref="passWord"  placeholder="必填，密码长度需要8位" type="password" v-model="user.passWord" :min="8" required></x-input>
			<x-input title="姓名" ref="name" placeholder="必填" is-type="china-name" v-model="user.name" required></x-input>
			<x-input title="手机号码" ref="tel"  placeholder="必填" is-type="china-mobile" v-model="user.tel" keyboard="number" required></x-input>
			<x-input title="身份证号码" ref="identity" placeholder="必填"  v-model="user.identity" required></x-input>
			<x-address title="地址" ref="address"  v-model="user.myaddress" :list="addressData" placeholder="请选择地址"  required></x-address>
			<x-textarea title="街道/小区" ref="street" :max="200" v-model="user.street"  placeholder="必填"></x-textarea>
			<popup-picker title="身份" :data="authList" v-model="selectedAuth"> </popup-picker>
			<x-input title="验证码" v-model="certPic.inputStr"  required>
	          <img @click="getCertPic()" slot="right-full-height" :src="certPic.imgSrc" width="120" height="50">
	        </x-input>
		</group>
		 <x-button type="primary" style="margin-top:15px" @click.native="submit">注册</x-button>
		 <alert v-model="show0" title="注册失败，用户名已存在"></alert>
		 <alert v-model="show1" title="注册成功"></alert>
		 <alert v-model="show2" title="请检查填写的数据"></alert>
		 <alert v-model="show3" title="验证码错误,请重新填写"></alert>
	</div>
</template>

<script>
	import {XInput, Group, XButton,XHeader,XAddress,ChinaAddressV4Data,XTextarea,Value2nameFilter as value2name ,Alert,Blur,PopupPicker } from 'vux'
	import * as API from '@/components/register/api'
	import jQuery from 'jquery'

	export default{
		components:{
			XInput,XButton,Group,XHeader,XAddress,XTextarea,Alert,Blur,PopupPicker 
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
					auth:'0',
				},
				authList:[['普通用户','平台管理员']],
				selectedAuth:['普通用户'],
				addressData: ChinaAddressV4Data,
				certPic:{
					randStr:'',
					imgSrc:'',
					inputStr:'',
				},
				show0:false,
				show1:false,
				show2:false,
				show3:false,
			}
		},
		created(){
			this.getCertPic()
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
			getCertPic(){
				let $this = this
				API.getCertPic().then(function(data){
					//success
					$this.certPic.randStr=data.randStr
				    $this.certPic.imgSrc='data:image/png;base64,'+data.imgSrc
				})
			},
			submit(){
				let $this=this
				//验证表单数据
				for(var key in $this.$refs){
					let item=$this.$refs[key]
					if('valid' in item){
						if(item.valid==false){
							$this.show2=true;
							return;
						}
					}
				}
				//对比验证码
				if($this.certPic.inputStr!=$this.certPic.randStr){
					$this.show3=true;
					return
				}
			
				//拼接地址
				this.user.address=value2name(this.user.myaddress,ChinaAddressV4Data)+' '+this.user.street
				//修改身份
				if(this.selectedAuth[0]=='普通用户'){
					this.user.auth='0'
				}
				else{
					this.user.auth='1'
				}
				
				API.register(JSON.stringify(this.user)).then(function(data){
					 if(data.result=='success'){
			         	$this.show1=true;
			         }
			         else{
			         	$this.show0=true
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
	}
	.center img {
	  width: 60px;
	  height: 60px;
	  border-radius: 50%;
	  border: 3px solid #ececec;
	}
</style>
