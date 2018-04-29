<template>
	<div>
	
		<flexbox :gutter="0" wrap="wrap">
			<flexbox-item :span="1/3" v-for="(item, index) in books" >
				<div style="width:100px;height:100px;padding:12px;line-height:100px">
					<img class="previewer-demo-img" :src="item.src"  width="100" height="100" @click="show(index)">
				</div>
				<div style="margin-bottom:10px;padding:5px" @click="$router.push('/main/repository/book-detail')">
					<p style="font-size:18px;text-align:center">{{item.bookname}}</p>
				    <p style="font-size:18px;text-align:center">{{item.author}}</p>
				</div>
			</flexbox-item>
		</flexbox>
	
	<previewer :list="books" ref="previewer" :options="options" ></previewer>
	</div>
</template>	

<script>
	import {Previewer,Flexbox,FlexboxItem,Scroller } from 'vux'
	import jQuery from 'jquery'
	export default {
		components:{
			Previewer,Flexbox,FlexboxItem,Scroller
		},
		methods:{
			show(index){
				this.$refs.previewer.show(index)
			}
		},
		created(){
			let $this = this
			jQuery.ajax({
				type:'post',
				url:'p2pbook/show-mybook',
				success:function(data){
					$this.books=[]
					data.forEach((item,index)=>{
						let book={}
						book.src=item.url
						book.bookname=item.bookName
						book.author=item.author
						$this.books.push(book)
					})
				}
			})
		},
		data(){
           return {
           	  books:[],
           	   options: {
		        getThumbBoundsFn (index) {
		         
		        }
		      },
           }
		},
	}
</script>