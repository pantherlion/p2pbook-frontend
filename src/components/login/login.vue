<template>
  <div>
    <img src="../../assets/logo/p2pbook.png" height="250" width="340"/>
    <group label-align="left" label-width="120px">
        <x-input title="用户名" ref="userName"  placeholder="必填" v-model="user.userName" required></x-input>
        <x-input title="密码" ref="passWord" placeholder="必填" v-model="user.passWord" type="password" required :min="8"></x-input>
        <selector title="身份" v-model="user.identity" :options="ids"></selector>
         <x-input title="验证码" v-model="certPic.inputStr"  required>
            <img @click="getCertPic()" slot="right-full-height" :src="certPic.imgSrc" width="120" height="50">
        </x-input>
        <flexbox justify="space-around">
          <flexbox-item><p style="padding-left:15px;" @click="$router.push('/register')">用户注册</p></flexbox-item>
          <flexbox-item><x-button  type="primary" @click.native="submit" >登录</x-button></flexbox-item>
        </flexbox>
    </group>
    <alert v-model="show" title="登录失败"></alert>
    <alert v-model="show1" title="请检查填写的数据"></alert>
     <alert v-model="show2" title="验证码错误,请重新填写"></alert>
  </div>
</template>

<script>
  import {XInput ,Selector,Group,Flexbox, FlexboxItem,XButton,Alert,CellBox,Cell  } from 'vux'
  import jQuery from 'jquery'
  export default {
   components:{
      XInput ,Selector,Group,Flexbox, FlexboxItem,XButton,Alert,CellBox,Cell    
  },
   data(){
      return{
        ids:[{key:'1',value:'用户'},{key:'2',value:'平台管理员'}],
        show:false,
        show1:false,
        show2:false,
        user:{
          identity:'1',
          userName:'',
          passWord:'',
        },
        certPic:{
          randStr:'',
          imgSrc:'',
          inputStr:'',
        },
      }
   },
  created(){
    this.getCertPic()
  },
  methods:{
    getCertPic(){
        let $this = this
        jQuery.ajax({
          type:'get',
          url:'/p2pbook/getCertPic',
          success:function(data){
            $this.certPic.randStr=data.randStr
            $this.certPic.imgSrc='data:image/png;base64,'+data.imgSrc
          }
        })
      },
     submit:function(){
        let $this=this;
        //验证表单填写是否正确
        for(let key in $this.$refs){
          let item =  $this.$refs[key]
          if('valid' in item){
            if(item.valid==false){
              $this.show1=true
              return
            }
          }
        }
        //验证校验码
        if($this.certPic.inputStr!=$this.certPic.randStr){
          $this.show2=true;
          return
        }
      
        jQuery.ajax({
          type:'post',
          url:'/p2pbook/login',
          data:JSON.stringify(this.user),
          contentType:"application/json;charset=UTF-8",
          success:function(data){
            if(data.result=='success'){
               if(data.identity=='user'){
                  $this.$router.push('/main')
               }
               else{
                 $this.$router.push('/admin')
               }
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

<style scoped lang="less">
  

 
</style>

