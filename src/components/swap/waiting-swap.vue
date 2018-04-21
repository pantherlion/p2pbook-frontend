<template>
	<div>
		<flexbox wrap="wrap" :gutter="0">
			<flexbox-item v-for="i in 12" :span="1/3">
				<p class="center" @click="$router.push('/main/swap/main/swap-info')"><img :src="url"></p>
				<p>pantherlion</p>
			</flexbox-item>
		</flexbox>
	</div>
</template>

<script>
	import { Tab, TabItem, Flexbox, FlexboxItem} from 'vux'
	export default {
	  components: {
	    Tab,TabItem,Flexbox,FlexboxItem   
	  },
	  data(){
	  	return {
	  		url:'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
	  	}
	  }
	}
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/center.less';
	.center img {
	  width: 60px;
	  height: 60px;
	  border-radius: 50%;
	  border: 2px solid #ececec;
	}
</style>