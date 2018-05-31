<template>
	<div>
		<panel :list="books"  @on-click-item="showMyBookDetail"></panel>
	   <!--  <previewer :list="books" ref="previewer"  ></previewer> -->
	    <popup v-model="showBookDetail" position="right" width="100%" height="100%" should-rerender-on-show >
	    	 <x-switch title="关闭" v-model="showBookDetail"></x-switch>
	    	<BookDetail :book="selectedBook" @refresh="refresh"/>
	    </popup>
	</div>
</template>	

<script>
	import {Previewer,Panel,Popup,XSwitch} from 'vux'
	import BookDetail from '@/components/repository/book-detail'
	import jQuery from 'jquery'
	function showMyBook($vue){
		jQuery.ajax({
				type:'post',
				url:'p2pbook/show-mybook',
				success:function(data){
					$vue.books=[]
					data.forEach((item,index)=>{
						let book={}
						book.src=item.url
						book.title=item.bookName
						book.desc=item.author+','+item.publisher
						book.meta=item
						$vue.books.push(book)
					})
				}
			})
	}

	export default {
		components:{
			Previewer,Panel,Popup,BookDetail,XSwitch
		},
		created(){
			showMyBook(this)
		},
		methods:{
			showMyBookDetail(item){
				this.showBookDetail=true
				this.selectedBook=item.meta
			},
			refresh(){
				showMyBook(this)
				this.showBookDetail=false
			}
		},
		data(){
           return {
           	  books:[],
           	  selectedBook:null,
           	  showBookDetail:false,
           }
		},
	}
</script>