<template>
	<div>
	   <panel :list="list" @on-click-item="toShowDealInfo"></panel>
	   <popup v-model="showDealInfo" width="100%" position="right" should-rerender-on-show>
	   	  <x-switch title="关闭" v-model="showDealInfo"></x-switch>
          <DealInfo :status="selectedSwapStatus"/>
	   </popup>
	</div>
</template>

<script>
	import {Panel,Alert,Popup,XSwitch} from 'vux'
	import jQuery from 'jquery'
	import DealInfo from '@/components/swap/deal-info'

	function getSwapStatus($vue){
		jQuery.ajax({
			type:'post',
			url:'p2pbook/getSwapStatus',
			success:function(data){
				$vue.list=[]
				data.forEach((item,index)=>{
					let status={}
					status.title= item.book1.user.userName
					status.desc=item.book1.bookName+'<->'+item.book2.bookName
					status.meta=item
					$vue.list.push(status)
				})
			},
		})
	}

	export default {
	  components: {
	  	 Panel,Alert,Popup,DealInfo,XSwitch
	  },
	  methods:{
	  	toShowDealInfo(item){
	  		this.showDealInfo=true
	  		this.selectedSwapStatus=item.meta
	  	}
	  },
	  created(){
	  	getSwapStatus(this)
	  },
	  data(){
        return {
        	list:[],
        	showDealInfo:false,
        	selectedSwapStatus:null,
        }
	  },
	}
</script>

<style lang="less" scoped>
	.center img {
	  width: 65px;
	  height: 65px;
	  border-radius: 50%;
	  border: 4px solid #ececec;
	}
</style>