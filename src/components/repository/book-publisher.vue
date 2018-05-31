<template>
	<div>
		<blur :blur-amout="40" :url="url" :height="120">
			<p class="center"><img :src="url"></p>
		</blur>
		<group label-align="left" label-width="140px">
		   <cell title="发布人" :value="owner"></cell>
		   <cell title="书名" :value="bookName"></cell>
		   <cell title="作者" :value="author"></cell>
		   <cell title="出版社" :value="publisher"></cell>
		   <cell title="售价" :value="price"></cell>
		   <cell title="描述" :value="desc"></cell>
		   <selector  title="置换书本" direction="rtl" v-model="selectedBook" :options="options"></selector>
        </group>
         <x-button type="primary" style="margin-top:15px" @click.native="addSwap">发送置换申请</x-button>
         <alert v-model="showSuccess">申请成功</alert>
         <alert v-model="showFailure">申请失败</alert>
         <alert v-model="showError">请选择需要置换的书本</alert>
         <alert v-model="showError1">不能申请由自己发布的书</alert>
	</div>
	</div>
</template>

<script>
	import {Blur,Group,Cell,XButton,Selector,Alert} from 'vux'
	import jQuery from 'jquery'
	function addSwap($vue){
		if(!$vue.selectedBook){
			$vue.showError=true
			return
		}
		if($vue.mybooks[$vue.selectedBook].user.id==$vue.book.user.id){
			$vue.showError1=true
			return
		}
		let $this = this
		let param = {bookId1:$vue.selectedBook,bookId2:$vue.book.id}
		jQuery.ajax({
			type:'post',
			url:'p2pbook/add-swap',
			data:jQuery.param(param),
			success:function(data){
				if(data.result=='success'){
					$vue.showSuccess=true
				}
				else{
					$vue.showFailure=true
				}
			},
			error:function(){
				$vue.showFailure=true
			}
		})
	}
	export default {
		components:{
			Blur,Group,Cell,XButton,Selector,Alert 
		},
		props:['book'],
		methods:{
			addSwap(){
				addSwap(this)
			}
		},
		created(){
			let $this = this
			jQuery.ajax({
				type:'post',
				url:'p2pbook/show-myAvaliableBooks',
				success:function(data){
					$this.options=[]
					data.forEach((item,index)=>{
						let radio={}
						radio.key=item.id
						radio.value=item.bookName
						$this.options.push(radio)
						$this.mybooks[item.id]=item
					})
				}
			})
		},
		data(){
			let item = this.book
			return {
				showSuccess:false,
				showFailure:false,
				url:item!=null?item.user.url:'',
				bookName:item!=null?item.bookName:'',
				author:item!=null?item.author:'',
				publisher:item!=null?item.publisher:'',
				price:item!=null?item.price:'',
				desc:item!=null?item.desc:'',
				owner:item!=null?item.user.userName:'',
				selectedBook:null,
				showError:false,
				showError1:false,
				options:[],
				mybooks:{},
			}
		},
	}
</script>

<style lang="less" scoped>
   @import '~vux/src/styles/close';
   .center {
	  text-align: center;
	  padding-top: 20px;
	}
	.center img {
	  width: 65px;
	  height: 65px;
	  border-radius: 50%;
	  border: 4px solid #ececec;
	}
	 .vux-close {
	    margin-top: 8px;
	    margin-bottom: 8px;
	  }

</style>