<template>
	<div>
		<img src="../../assets/logo/logo.png" height="264" width="100%">
    <tab>
      <tab-item selected @on-item-click="$router.push({path:'/userlogin'})">普通用户</tab-item>
      <tab-item @on-item-click="$router.push({path:'/adminlogin'})">管理员</tab-item>
    </tab>
	  <router-view/>
	</div>
</template>

<script>
  import { Tab, TabItem, Sticky } from 'vux'
 
  export default {
   components:{
      Tab,TabItem,Sticky
  },
  mounted:function(){
       this.$router.push({path:'/userlogin'})
  },
  methods:{
   
  }
}
</script>
