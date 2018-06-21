<template>
	<div>
	  <search placeholder="书名/作者"   @on-submit="queryByAuthorOrBookName" v-model="searchContent"></search>

	  <tab   v-model="selectedIndex">
        <tab-item :selected="selectedIndex==index" @on-item-click="queryByCategory"  v-for="(item, index) in categorys"  :key="index">{{item}}</tab-item>
      </tab>

      <msg style="margin-top:70px;" v-if="books.length==0" title="暂无符合查询条件的图书"  icon="waiting">
			<template slot="buttons">
				<x-button type="primary" @click.native="refresh">刷新</x-button>
			</template>
		</msg>

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
	import {Panel,Tab,TabItem,Scroller,Search,Popup,XSwitch,Msg,XButton} from 'vux'
    import jQuery from 'jquery'
    import BookPublisher from '@/components/repository/book-publisher'
    import * as API from '@/components/repository/api'

	const cats = ['信息技术', '文学', '言情', '玄幻', '亲子','惊悚','历史','都市']
    export default {
	  components: {
	    Tab,TabItem,Scroller,Panel,Search,Popup,BookPublisher,XSwitch,Msg,XButton
	  },
	  created(){
	  	this.queryByCategory(this.selectedIndex)
	  },
	  methods:{
	  	toBookPublisher(item){
	  		this.selectedBook=item.meta
	  		this.showBookPublisher=true
	  	},
	  	queryByAuthorOrBookName(){
	  		let param = {searchContent:this.searchContent}
	  		let $this = this
	  		API.queryByAuthorOrBookName(jQuery.param(param)).then(function(data){
	  			$this.renderList(data)
	  		})
	  	},
	  	renderList(data){
	  		let $this = this
	  	    $this.books=[]
	  		data.forEach((item,index)=>{
  				let temp={}
  				temp.src=item.url
  				temp.title=item.bookName
  				temp.desc=item.publisher+'-'+item.author
  				temp.meta=item
  				$this.books.push(temp)
  			})
	  	},
	  	queryByCategory(){
		  	 let $this=this
		  	 let param={categoryId:this.selectedIndex}
		  	 API.queryByCategory(jQuery.param(param)).then(function(data){
		  	 	    $this.renderList(data)
		  	 })
	  	},
	  	refresh(){
	  		this.queryByCategory(this.selectedIndex)
	  	}
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

</style>