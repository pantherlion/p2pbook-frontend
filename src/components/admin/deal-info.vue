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

	</div>
</template>

<script>
	import {Group,Cell,Flow,FlowState,FlowLine} from 'vux'
	export default{
		components:{
			Group,Cell
		},
		props:['deal'],
		data(){
			let st=this.deal
			return {
				user1:st!=null?st.book1.user.userName:'',
				bookName1:st!=null?st.book1.bookName:'',
				author1:st!=null?st.book1.author:'',
				publisher1:st!=null?st.book1.publisher:'',
				price1:st!=null?st.book1.price:'',
				user2:st!=null?st.book2.user.userName:'',
				bookName2:st!=null?st.book2.bookName:'',
				author2:st!=null?st.book2.author:'',
				publisher2:st!=null?st.book2.publisher:'',
				price2:st!=null?st.book2.price:'',
			}
		}
	}
	
</script>