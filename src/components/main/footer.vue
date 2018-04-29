<template>
   <div>
	<tabbar>
		<tabbar-item selected link="/main/repository/book-list">
			<img slot="icon"  :src="paths[0]"  height="32" width="32">
			<img slot="icon-active" :src="paths[1]"  height="32" width="32">
			<span slot="label">发现</span>
		</tabbar-item>
		<tabbar-item link="/main/swap/main">
			<img slot="icon" :src="paths[2]" height="32" width="32">
			<img slot="icon-active" :src="paths[3]" height="32" width="32">
			<span slot="label">我的置换</span>
		</tabbar-item>
		<tabbar-item @on-item-click="showMenus=true">
			<img style="height:40px;width:40px;" slot="icon"  src="../../assets/logo/publish.png" height="32" width="32">
		</tabbar-item>
		<tabbar-item link="/main/myread/myread-preview">
			<img slot="icon" :src="paths[4]" height="32" width="32">
			<img slot="icon-active" :src="paths[5]" height="32" width="32">
			<span slot="label">我的阅读</span>
		</tabbar-item>
		<tabbar-item link="/main/account">
			<img slot="icon" :src="paths[6]" height="32" width="32">
			<img slot="icon-active" :src="paths[7]" height="32" width="32">
			<span slot="label">我的账户</span>
		</tabbar-item>
	</tabbar>
	<div v-transfer-dom>
	      <actionsheet :menus="menus" v-model="showMenus" theme="android" @on-click-menu="$router.push({path:'/main/repository/book-add'})"></actionsheet>
	</div>
  </div>
</template>

<script>
	import { Tabbar, TabbarItem,TransferDom,Actionsheet } from 'vux'
	import myFind from '@/assets/logo/myfind.png'
	import myFindActive from '@/assets/logo/myfind_active.png'
	import Detail from '@/assets/logo/detail.png'
	import DetailActive from '@/assets/logo/detail_active.png'
	import myReadLog from '@/assets/logo/myreadlog.png'
	import myReadLogActive from '@/assets/logo/myreadlog_active.png'
	import myAccount from '@/assets/logo/myaccount.png'
	import myAccountActive from '@/assets/logo/myaccount_active.png'
	let urls=[myFind,myFindActive,Detail,DetailActive,myReadLog,myReadLogActive,myAccount,myAccountActive]

	export default {
	 directives: {
	    TransferDom
	 },
	  components: {
	    Tabbar,
	    TabbarItem,
	    Actionsheet,
	  },
	  data(){
	  	return {
	  		paths:urls,
	  		showMenus:false,
	  		menus: [
                {
                	label:'发布闲置',
                },
		      ],
	  	}
	  },
	}
</script>

<style lang="less">
	a{
		text-decoration:none
	}

</style>