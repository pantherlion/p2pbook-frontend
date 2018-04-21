<template>
	<div>
		<blur :blur-amout="40" :url="url" :height="120">
			<p class="center"><img :src="url"></p>
		</blur>
	</div>
</template>

<script>
	import { Blur } from 'vux'
	export default {
		components:{
			Blur
		},
		data(){
			return {
				url:'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
			}
		},
	}
</script>

<style scoped>
	.center {
	  text-align: center;
	  padding-top: 20px;
	  color: #fff;
	  font-size: 18px;
	}
	.center img {
	  width: 60px;
	  height: 60px;
	  border-radius: 50%;
	  border: 4px solid #ececec;
	}
</style>