<template>
	<div>
	  <search placeholder="书名/作者" :auto-scroll-to-top="true"  @on-submit="queryByAuthorOrBookName" v-model="searchContent"></search>

	  <tab :line-width="1" active-color='#fc378c' v-model="selectedIndex">
        <tab-item @on-item-click="queryByCategory"  v-for="(item, index) in categorys"  :key="index">{{item}}</tab-item>
      </tab>

      <!--内容-->
      <scroller lock-x>
      	<panel  :list="books" type="1" @on-click-item="toBookPublisher"></panel>
      </scroller>
      
      <popup v-model="showBookPublisher" position="right" width="100%" should-rerender-on-show>
      	 <x-switch title="" v-model="showBookPublisher"></x-switch>
      	 <BookPublisher :book="selectedBook"/>
      </popup>
     
	</div>
</template>

<script>
	import {Panel,Tab,TabItem,Scroller,Search,Popup,XSwitch} from 'vux'
    import jQuery from 'jquery'
    import BookPublisher from '@/components/repository/book-publisher'

	const cats = ['信息技术', '文学', '言情', '玄幻', '亲子','惊悚','历史','都市']
    export default {
	  components: {
	    Tab,TabItem,Scroller,Panel,Search,Popup,BookPublisher,XSwitch
	  },
	  methods:{
	  	toBookPublisher(item){
	  		this.selectedBook=item.meta
	  		this.showBookPublisher=true
	  	},
	  	queryByAuthorOrBookName(){
	  		let $this = this
	  		let param = {searchContent:this.searchContent}
	  		jQuery.ajax({
	  			type:'post',
	  			url:'/p2pbook/show-allbook-byAuthorOrBookName',
	  			data:jQuery.param(param),
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
	  	queryByCategory(){
	  	 let $this=this
	  	 let param={categoryId:this.selectedIndex}
	  		//Ajax请求数据
	  	 jQuery.ajax({
	  		type:'post',
	  		url:'/p2pbook/show-allbook-byCategory',
	  		data:jQuery.param(param),
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
	  		showBookPublisher:false,
	  		selectedBook:null,
	  	}
	  },

    }

</script>

<style lang="less" scoped>
  @import '~vux/src/styles/center.less';
</style>