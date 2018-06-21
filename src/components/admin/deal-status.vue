<template>
	<div>
		<x-header :left-options="{showBack: false}"></x-header>
		<tab>
		  <tab-item :selected="selectedTabIndex==index" v-for="(item,index) in tabList" @on-item-click="handler">{{item}}</tab-item>
	    </tab>

	    <divider></divider>

	    <msg style="margin-top:70px;" v-if="list.length==0" title="暂无置换请求"  icon="waiting">
			<template slot="buttons">
				<x-button type="primary" @click.native="refresh">刷新</x-button>
			</template>
		</msg>

		<scroller lock-x v-for="item in list">
			<form-preview header-label="置换摘要" :body-items="item" :footer-buttons="buttons" :name="item[2]"></form-preview>
		</scroller>

		<popup v-model="showDealInfo" width="100%" position="right" should-rerender-on-show>
			<x-switch title="" v-model="showDealInfo"></x-switch>
			<DealInfo v-if="showDealInfo" :deal="selectedDeal" @refresh="refresh"/>
		</popup>
	</div>
</template>

<script>
  import {XHeader,Popup,XSwitch,Alert,Scroller,FormPreview,Tab, TabItem,Divider,Msg,XButton } from 'vux'
  import DealInfo from '@/components/admin/deal-info'
  import * as API from '@/components/admin/api'
  import jQuery from 'jquery'

  export default{
      components:{
      	Popup,DealInfo,XSwitch,Alert,XHeader,Scroller,FormPreview,Tab,TabItem,Divider,Msg,XButton 
      },
      created(){
      	this.handler(this.selectedTabIndex)
      },
      methods:{
      	handler(index){
      		this.selectedTabIndex=index
      		let statusId=index-1
      		let param = {statusId:statusId}
      		let $this = this
  			API.getDeals(jQuery.param(param)).then(function(data){
	  			$this.list=[]
			    data.forEach((item,index)=>{
					let deal = [{
						label:'置换方',
						value:item.book1.user.userName+'<->'+item.book2.user.userName

					},{
						label:'置换书本',
						value:item.book1.bookName+'<->'+item.book2.bookName
					}]
					deal.push(item)
					$this.list.push(deal)
				})
  	       })
      	},
      	refresh(){
      		this.handler(this.selectedTabIndex)
      		this.showDealInfo=false
      	}
      },
      data(){
      	return{
      		list:[],
      		tabList:['失败置换请求','待用户处理','待管理员处理','成功置换请求'],
      		showDealInfo:false,
      		selectedDeal:null,
      		selectedTabIndex:2,
      		buttons:[{
      			style:'primary',
      			text:'查看详情',
      			onButtonClick:(item)=>{
      				this.selectedDeal=item
      				this.showDealInfo=true
      			}
      		}],
      	}
      }
  }
</script>