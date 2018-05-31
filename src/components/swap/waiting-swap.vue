<template>
	<div>
		<swipeout>
			<swipeout-item v-for="item in list">
				<div slot='content'>
					<panel :list="[item]"  @on-click-item="toShowSwapInfo"></panel>
				</div>
				<div slot="right-menu">
					<swipeout-button @click.native="agreeSwap(item.meta)" type="primary">同意申请</swipeout-button>
				</div>
			</swipeout-item>
		</swipeout>
  
		<popup v-model="showSwapInfo" width="100%" position="right" should-rerender-on-show>
			<x-switch title="" v-model="showSwapInfo"></x-switch>
			<SwapInfo  :status="selectedStatus"/>
		</popup>

		<alert v-model="showSuccess">置换申请已进入管理员审核阶段</alert>
		<alert v-model="showFail">置换失败</alert>
	</div>
</template>

<script>
	import { Panel,Swipeout, SwipeoutItem, SwipeoutButton,Alert,Popup,XSwitch} from 'vux'
	import SwapInfo from '@/components/swap/swap-info'
	import jQuery from 'jquery'

	function getWaitingSwap($vue){
		jQuery.ajax({
			type:'post',
			url:'p2pbook/getWaitingSwap',
			success:function(data){
				$vue.list=[]
				data.forEach((item,index)=>{
					let swap = {}
					swap.src=item.book1.user.url
					swap.title=item.book1.user.userName
					swap.desc=item.book1.bookName+'<->'+item.book2.bookName
					swap.meta=item
					$vue.list.push(swap)
				})
				$vue.$emit('update',{count:$vue.list.length})
			},
		})
	}

	function agreeSwap($vue,item){
		let param={swapId:item.id}
		jQuery.ajax({
			type:'post',
			url:'p2pbook/agreeSwap',
			data:jQuery.param(param),
			success:function(data){
				if(data.result=='success'){
					$vue.showSuccess=true
					getWaitingSwap($vue)
				}
				else{
					$vue.showFail=true
				}
			},
			fail:function(){
				$vue.showFail=true
			}
		})
	}

	export default {
	  components: {
	     Panel,Swipeout, SwipeoutItem, SwipeoutButton,Alert,Popup,SwapInfo,XSwitch
	  },
	  created(){
	  	getWaitingSwap(this)
	  },
	  methods:{
	  	agreeSwap:function(item){
	  		agreeSwap(this,item)
	  	},
	  	toShowSwapInfo:function(item){
	  		this.showSwapInfo=true
	  		this.selectedStatus=item.meta
	  	},
	  },
	  data(){
	  	return {
	  		list:[],
	  		showFail:false,
	  		showSuccess:false,
	  		showSwapInfo:false,
	  		selectedStatus:null,
	  	}
	  }
	}
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/center.less';
	.center img {
	  width: 60px;
	  height: 60px;
	  border-radius: 50%;
	  border: 2px solid #ececec;
	}
</style>