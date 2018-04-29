<template>
	<div>
		<x-header></x-header>
		<blur :blur-amout="40" :url="url" :height="120">
			<p class="center"><img :src="url"></p>
		</blur>

		<group label-align="left" label-width="140px">
		   <cell title="书名" :value="bookName"></cell>
		   <cell title="作者" :value="author"></cell>
		   <cell title="出版社" :value="publisher"></cell>
		   <cell title="发布人" :value="owner"></cell>
           <cell  is-link title="发布人的其他闲置书本" link="/main/repository/book-preview"></cell>
        </group>

         <x-button type="primary" @click.native="show=true">申请置换</x-button>

         <!--置换列表-->
         <div v-transfer-dom>
	      <x-dialog v-model="show">
	      	<div>
	      		<group title="图书列表">
			      <radio  :options="radio" v-model="radioValue"></radio>
			    </group>
	      	</div>
	        <div @click="show=false">
	            <span class="vux-close"></span>
	        </div>
	      </x-dialog>
	    </div>

	</div>
</template>

<script>
	import {TransferDom,Blur,Group,Cell,XButton,XDialog,Radio,CellFormPreview,XHeader  } from 'vux'
	export default {
	     directives: {
		    TransferDom,
		 },
		components:{
			Blur,Group,Cell,XButton,XDialog,Radio,CellFormPreview,XHeader 
		},
		data(){
			let item = this.$route.query.book

			return {
				url:item.user.url,
				show:false,
				radio: ['Tensorflow','Pytorch'],
				radioValue:'',
				bookName:item.bookName,
				author:item.author,
				publisher:item.publisher,
				owner:item.user.userName,
			}
		},
	}
</script>

<style lang="less" scoped>
   @import '~vux/src/styles/close';

   .center {
	  text-align: center;
	  padding-top: 20px;
	  color: #fff;
	  font-size: 18px;
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