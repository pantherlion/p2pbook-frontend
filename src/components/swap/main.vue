<template>
	<div>
	  <tab :line-width='2' active-color='#fc378c'>
	  	<tab-item @on-item-click="$router.push('/main/swap/main/waiting-swap')" class="vux-center" selected :badge-label="recieveRe" badge-color="#fff">收到的置换请求</tab-item>
	  	<tab-item @on-item-click="$router.push('/main/swap/main/deal-status')" class="vux-center" >置换跟踪</tab-item>
      </tab>
      <router-view @update="updateRe"/>
	</div>
</template>

<script>
	import { Tab, TabItem} from 'vux'
	export default {
	  components: {
	    Tab,TabItem  
	  },
	  methods:{
	  	updateRe(item){
	  		this.recieveRe=item.count+''
	  	},
	  },
	  data(){
	  	return{
	  			recieveRe:0+''
	  	}
	  }
	}

</script>

<style lang="less" scoped>
  
</style>