<template>
	<div>
		<swipeout v-for="item in list">
			<swipeout-item>
				<div slot="right-menu">
					<swipeout-button type="primary" @click.native="agreeDeal(item.meta)">通过</swipeout-button>
					<swipeout-button type="warn" @click.native="rejectDeal(item.meta)">拒绝</swipeout-button>
				</div>
				<div slot="content">
					<panel :list="[item]" @on-click-item="toDealInfo"></panel>
				</div>
			</swipeout-item>
		</swipeout>

		<popup v-model="showDealInfo" width="100%" position="right" should-rerender-on-show>
			<x-switch title="关闭" v-model="showDealInfo"></x-switch>
			<DealInfo :deal="selectedDeal"/>
		</popup>

		<alert v-model="showAgreeSuccess">审核通过</alert>
		<alert v-model="showRejectSuccess">拒绝审核成功</alert>
		<alert v-model="showError">请求异常</alert>
	</div>
</template>

<script>
  import {Swipeout,SwipeoutItem,SwipeoutButton,Panel,Popup,XSwitch,Alert} from 'vux'
  import DealInfo from '@/components/admin/deal-info'
  import jQuery from 'jquery'

  function getAuditDeals($vue){
  	 jQuery.ajax({
  	 	type:'POST',
  	 	url:'p2pbook/getAuditDeals',
  	 	success:function(data){
  	 		$vue.list=[]
		    data.forEach((item,index)=>{
				let deal = {}
				deal.title=item.book1.user.userName
				deal.desc=item.book1.bookName+'<->'+item.book2.bookName
				deal.meta=item
				$vue.list.push(deal)
			})
  	 	},
  	 })
  }

  function agreeDeal($vue,item){
		let param={dealId:item.id}
		jQuery.ajax({
			type:'post',
			url:'p2pbook/agreeDeal',
			data:jQuery.param(param),
			success:function(data){
				if(data.result=='success'){
					$vue.showAgreeSuccess=true
					getAuditDeals($vue)
				}
				else{
					$vue.showError=true
				}
			},
			fail:function(){
				$vue.showError=true
			},
		})
	}

	function rejectDeal($vue,item){
		let param={dealId:item.id}
		jQuery.ajax({
			type:'post',
			url:'p2pbook/rejectDeal',
			data:jQuery.param(param),
			success:function(data){
				if(data.result=='success'){
					$vue.showRejectSuccess=true
					getAuditDeals($vue)
				}
				else{
					$vue.showError=true
				}
			},
			fail:function(){
				$vue.showError=true
			}
		})
	}

  export default{
      components:{
      	Swipeout,SwipeoutItem,SwipeoutButton,Panel,Popup,DealInfo,XSwitch,Alert
      },
      methods:{
      	toDealInfo(item){
      		this.selectedDeal=item.meta
      		this.showDealInfo=true
      	},
      	agreeDeal(item){
      		agreeDeal(this,item)
      	},
      	rejectDeal(item){
      		rejectDeal(this,item)
      	}
      },
      created(){
      	getAuditDeals(this)
      },
      data(){
      	return{
      		list:[],
      		showDealInfo:false,
      		selectedDeal:null,
      		showAgreeSuccess:false,
      		showRejectSuccess:false,
      		showError:false,
      	}
      }
  }
</script>