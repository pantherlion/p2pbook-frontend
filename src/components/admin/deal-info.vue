<template>
	<div>
		<group title="置换甲方" label-align="left" label-width="140px">
		   <cell title="发布人" :value="user1"></cell>
		   <cell title="书名" :value="bookName1"></cell>
		   <cell title="作者" :value="author1"></cell>
		   <cell title="出版社" :value="publisher1"></cell>
		   <cell title="售价" :value="price1"></cell>
        </group>

        <group title="置换乙方" label-align="left" label-width="140px">
           <cell title="发布人" :value="user2"></cell>
		   <cell title="书名" :value="bookName2"></cell>
		   <cell title="作者" :value="author2"></cell>
		   <cell title="出版社" :value="publisher2"></cell>
		   <cell title="售价" :value="price2"></cell>
        </group>

        <group v-if="deal.status==1">
        	<x-button type="primary" @click.native="agree">同意</x-button>
        	<x-button type="warn" @click.native="reject">拒绝</x-button>
        </group>
	</div>
</template>

<script>
	import {Group,Cell,XButton} from 'vux'
	import * as API from '@/components/admin/api'
	import jQuery from 'jquery'

	export default{
		components:{
			Group,Cell,XButton
		},
		props:['deal'],
		methods:{
			agree(){
				let param={dealId:this.deal.id}
				let $this = this
				API.agreeDeal(jQuery.param(param)).then(function(data){
					if(data.result=='success'){
						 $this.$emit('refresh')
					}
				})
			},
			reject(){
				let param={dealId:this.deal.id}
				let $this = this
				API.rejectDeal(jQuery.param(param)).then(function(data){
					API.rejectDeal(jQuery.param(param)).then(function(data){
						if(data.result=='success'){
							 $this.$emit('refresh')
						}
					})
				})
			}
		},
		data(){
			let st=this.deal
			return {
				user1:st.book1.user.userName,
				bookName1:st.book1.bookName,
				author1:st.book1.author,
				publisher1:st.book1.publisher,
				price1:st.book1.price,
				user2:st.book2.user.userName,
				bookName2:st.book2.bookName,
				author2:st.book2.author,
				publisher2:st.book2.publisher,
				price2:st.book2.price,
			}
		}
	}
	
</script>