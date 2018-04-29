<template>
	<div>

	  <search placeholder="书名/作者" :auto-scroll-to-top="true"  @on-submit="queryByAuthorOrBookName" v-model="searchContent"></search>

	  <tab :line-width=1 active-color='#fc378c' v-model="selectedIndex">
        <tab-item @on-item-click="queryByCategory"  v-for="(item, index) in categorys"  :key="index">{{item}}</tab-item>
      </tab>

      <!--内容-->
      <scroller lock-x>
      	<panel  :list="books" type="1" @on-click-item="to_publisher"></panel>
      </scroller>
      	
	</div>
</template>

<script>
	import {Panel,Tab, TabItem,Scroller,Search} from 'vux'
    import jQuery from 'jquery'
	const cats = ['信息技术', '文学', '言情', '玄幻', '亲子','惊悚','历史','都市']
    export default {
	  components: {
	    Tab,TabItem,Scroller,Panel,Search
	  },
	  methods:{
	  	to_publisher(item){
	  		this.$router.push({path:'/main/repository/book-publisher',query:{book:item.meta}})
	  	},
	  	queryByAuthorOrBookName(){

	  	},
	  	queryByCategory(){
	  		let $this=this
	  		//Ajax请求数据
	  		jQuery.ajax({
	  		type:'post',
	  		url:'/p2pbook/show-allbook-exceptSelf',
	  		contentType:'application/json;charset=UTF-8',
	  		success:function(data){
	  			$this.books=[]
	  			data.forEach((item,index)=>{
	  				let temp={}
	  				temp.src=item.url
	  				temp.title=item.bookName
	  				temp.desc=item.publisher+'-'+item.author
	  				temp.meta=item
	  				$this.books.push(temp)
	  			})
	  		}
	  	})
	  	},
	  },
	  data(){
	  	return {
	  		categorys:cats,
	  		selectedIndex:0,
	  		searchContent:'',
	  		books:[],
	  	}
	  },

    }

</script>

<style lang="less" scoped>
  @import '~vux/src/styles/center.less';
</style>