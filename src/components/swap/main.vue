<template>
	<div>
	  <tab :line-width='2' active-color='#fc378c'>
	  	<tab-item @on-item-click="$router.push('/main/swap/main/waiting-swap')" class="vux-center" selected badge-label="1" badge-color="#fff">待处理的置换</tab-item>
	  	<tab-item @on-item-click="$router.push('/main/swap/main/deal-status')" class="vux-center" >置换跟踪</tab-item>
      </tab>
      
      <router-view/>
	</div>
</template>

<script>
	import { Tab, TabItem} from 'vux'
	export default {
	  components: {
	    Tab,TabItem  
	  },
	}

</script>

<style lang="less" scoped>
  
</style>