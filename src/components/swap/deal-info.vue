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

        <group>
        	<flow v-if="st==-1">
        		<flow-state state="1" title="已拒绝"></flow-state>
        	</flow>
        	<flow v-if="st!=-1">
				<flow-state state="1" title="待对方确认"></flow-state>
				<flow-line :is-done="down1" :tip="tip1"></flow-line>

				<flow-state state="2" title="待管理员审核"></flow-state>
				<flow-line :is-done="down2"></flow-line>

				<flow-state state="3" title="完成"></flow-state>
			 </flow>
        </group>
	</div>
</template>

<script>
	import {Group,Cell,Flow,FlowState,FlowLine} from 'vux'
	export default {
	 	components:{
			Group,Cell,Flow,FlowState,FlowLine 
		},
		props:['status'],
		data(){
			let st = this.status
			let down1=false;let down2=false;
			let tip1='';
			if(st!=null && st.status==1){
				tip1="进行中"
			}
			else if(st!=null && st.status==2){
				down1=true
				down2=true
			}
			return {
				down1:down1,
				down2:down2,
				tip1:tip1,
				st:st!=null?st.status:'',
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