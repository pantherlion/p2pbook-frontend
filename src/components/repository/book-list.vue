<template>
	<div>
	  <search placeholder="书名/作者" :auto-scroll-to-top="true"  @on-submit="onSubmit" v-model="searchContent"></search>
	  <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="name === item" v-for="(item, index) in list" @click="name = item" :key="index">{{item}}</tab-item>
      </tab>
      <!--内容-->
      <scroller lock-x>
      	<panel  :list="datas" :type="type" @on-click-item="$router.push('/main/repository/book-publisher')" ></panel>
      </scroller>
	</div>
</template>

<script>
	import {Panel,Tab, TabItem,Scroller,Search} from 'vux'
	const cats = ['热门', '文学', '言情', '玄幻', '亲子','惊悚','历史','都市']
    export default {
	  components: {
	    Tab,TabItem,Scroller,Panel,Search
	  },
	  methods:{
	  	onSubmit(){
             
	  	},
	  },
	  data(){
	  	return {
	  		list:cats,
	  		index:0,
	  		name:cats[0],
	  		type:'1',
	  		searchContent:'',
	  		datas:[
               {
                 src: 'http://somedomain.somdomain/x.jpg',
                 fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                 title: 'tensorflow',
                 desc: '中国铁道出版社/李树全',
               },
	  		],
	  	}
	  },
    }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/center.less';
</style>