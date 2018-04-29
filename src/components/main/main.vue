<template>
	<div>
	    <router-view/>
	    <Footer/>
	</div>
</template>

<script>
    import Reset from '@/assets/style/reset.css'
	import {XHeader,Scroller} from 'vux'
	import Footer from '@/components/main/footer'
	export default {
		components:{
			XHeader,Scroller,Footer
		},
		mounted(){
           this.$router.push('/main/swap/main')
		},
	}
</script>

<style lang="less">
  

</style>