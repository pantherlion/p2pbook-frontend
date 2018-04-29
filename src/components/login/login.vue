<template>
  <div id="login" style="height:100%;display:flex;align-items:center;justify-content:center;">
    <group style="width:80%;margin:auto;position:relative;">
      <p style="text-align:left;font-size:20px;margin-top:15px;margin-bottom:15px">用户登录</p>
      <flexbox wrap="wrap" :gutter="0" >
         <flexbox-item :span="1/9">
            <img  src="../../assets/logo/login.png">
         </flexbox-item>
         <flexbox-item :span="8/9">
           <x-input   placeholder="请输入用户名" v-model="user.userName" required></x-input>
         </flexbox-item>

         <flexbox-item :span="1/9">
            <img  src="../../assets/logo/password.png">
         </flexbox-item>

          <flexbox-item :span="8/9">
             <x-input   placeholder="请输入密码" v-model="user.passWord" type="password" required :min="8"> </x-input>
          </flexbox-item>

        <flexbox-item :span="1/9">
          <img  src="../../assets/logo/platform.png">
        </flexbox-item>
        <flexbox-item :span="8/9"><selector v-model="user.identity" :options="ids"></selector></flexbox-item>

         <flexbox-item>
          <a @click="$router.push('/register')" style="display:block;text-align:center">用户注册</a>
        </flexbox-item>
        <flexbox-item style="text-align:center">
          <x-button mini type="primary" @click.native="submit" >登录</x-button>
        </flexbox-item>

      </flexbox>
    </group>

    <alert v-model="show" title="登录失败"></alert>
  </div>
</template>

<script>
  import {XInput ,Selector,Group,Flexbox, FlexboxItem,XButton,Alert } from 'vux'
  import jQuery from 'jquery'
  export default {
   components:{
      XInput ,Selector,Group,Flexbox, FlexboxItem,XButton,Alert   
  },
   data(){
      return{
        ids:[{key:'1',value:'用户'},{key:'2',value:'平台管理员'}],
        show:false,
        user:{
          identity:'1',
          userName:'',
          passWord:'',
        }
      }
   },
  methods:{
     submit:function(){
        let $this=this;
        jQuery.ajax({
          type:'post',
          url:'/p2pbook/login',
          data:JSON.stringify(this.user),
          contentType:"application/json;charset=UTF-8",
          success:function(data){
            if(data.result=='success'){
              //登录成功，跳转到主页
              $this.$router.push('/main')
            }
            else{
              //登录失败，给出提示
              $this.show=true
            }
          }
        })
     }
  }
}
</script>

<style lang="less">
  html,body{
    height: 100%;
    width:100%;
  }
  #login{
    background-image: url('../../assets/logo/background.png');
  }
</style>

